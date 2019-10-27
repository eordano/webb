import { Buffer } from 'buffer'
import { getServerConfigurations } from 'dcl/config'
import { EphemeralPresent, EPHEMERAL_PRESENT } from 'dcl/kernel/auth/actions'
import { EventEmitter } from 'events'
import { call, put, spawn, take } from 'redux-saga/effects'
import {
  commsSignatureSuccessAction,
  COMMS_SIGNATURE_SUCCESS,
  ephemeralGet,
  tokenRequest,
  TokenSuccessAction,
  TOKEN_SUCCESS
} from '../../auth/actions'
import { EphemeralKey, MessageInput } from '../../auth/ephemeral'
import { IBrokerConnection } from './IBrokerConnection'
import { WebRTCBrokerConnection } from './WebRTCBrokerConnection'

export function* setupWebRTCBroker(): any {
  const coordinatorURL = getServerConfigurations().worldInstanceUrl
  const body = `GET:${coordinatorURL}`
  yield put(tokenRequest())
  const tokenSuccessAction = (yield take(TOKEN_SUCCESS)) as TokenSuccessAction
  const accessToken = tokenSuccessAction.payload.commsToken
  const msg = Buffer.from(body)
  const input = MessageInput.fromMessage(msg)
  yield put(ephemeralGet())
  const ephemeral = ((yield take(EPHEMERAL_PRESENT)) as EphemeralPresent).payload
  const connectionString = yield call(getConnectionString, coordinatorURL, input, accessToken, ephemeral)
  yield spawn(dispatcher, connectionString)
}

function* dispatcher(url: string): any {
  const rpcForThisConnection = responder()
  const connection = new WebRTCBrokerConnection(url, rpcForThisConnection.caller)
  while (true) {
    const eventFromConnection = yield call(awaitMessage, connection)
    yield put(eventFromConnection)
  }
  // TODO: set broker only on success -- yield put(setBrokerConnection(connection))
}

function responder() {
  const event = new EventEmitter()
  return {
    caller: function(message: string) {
      return new Promise<Uint8Array>(resolve => {
        event.emit('query', message)
        event.once('response', (result: commsSignatureSuccessAction) => {
          resolve(result.payload)
        })
      })
    },
    looper: function*() {
      async function awaitSignatureRequest() {
        return new Promise<string>(resolve => {
          event.once('query', resolve)
        })
      }
      while (true) {
        const query = yield call(awaitSignatureRequest)
        yield put(query)
        const result = yield take(COMMS_SIGNATURE_SUCCESS)
        event.emit('response', result)
      }
    }
  }
}

async function awaitMessage(connection: IBrokerConnection) {
  return new Promise(resolve => {
    connection.onUpdateObservable.addOnce(resolve)
  })
}

export async function getConnectionString(
  coordinatorURL: string,
  input: MessageInput,
  accessToken: string,
  ephemeral: EphemeralKey
) {
  const credentials = await ephemeral.makeMessageCredentials(input, accessToken)
  const qs = new URLSearchParams({
    signature: credentials.get('x-signature'),
    identity: credentials.get('x-identity'),
    timestamp: credentials.get('x-timestamp'),
    'access-token': credentials.get('x-access-token')
  })
  const url = new URL(coordinatorURL)
  url.search = qs.toString()
  return url.toString()
}
