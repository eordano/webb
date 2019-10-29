import { Buffer } from 'buffer'
import { getServerConfigurations } from 'dcl/config'
import { EventEmitter } from 'events'
import { call, fork, put, take, takeLatest } from 'redux-saga/effects'
import { commsSignatureSuccessAction, COMMS_SIGNATURE_SUCCESS, ephemeralGet, EphemeralPresent, EPHEMERAL_PRESENT, tokenRequest, TokenSuccessAction, TOKEN_SUCCESS } from '../../auth/actions'
import { EphemeralKey, MessageInput } from '../../auth/ephemeral'
import { protocolOutPing, PROTOCOL_OUT_CHAT, PROTOCOL_OUT_PING, PROTOCOL_OUT_POSITION, PROTOCOL_OUT_PRIVATE_MESSAGE, PROTOCOL_OUT_PROFILE, PROTOCOL_OUT_SCENE, PROTOCOL_OUT_YELL, PROTOCOL_SUBSCRIPTION, PROTOCOL_UNSUBSCRIBE } from '../actions'
import { handlePrivateMessageRequest, handleSendChatRequest, handleSendPingRequest, handleSendPositionRequest, handleSendProfileRequest, handleSendSceneRequest, handleYellRequest, updateSubscriptions } from '../sagas'
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
  yield fork(dispatcher, connectionString)
}

function* dispatcher(url: string): any {
  const rpcForThisConnection = responder()
  const connection = new WebRTCBrokerConnection(url, rpcForThisConnection.caller)

  yield takeLatest(PROTOCOL_SUBSCRIPTION, updateSubscriptions(connection))
  yield takeLatest(PROTOCOL_UNSUBSCRIBE, updateSubscriptions(connection))

  yield takeLatest(PROTOCOL_OUT_POSITION, handleSendPositionRequest(connection))
  yield takeLatest(PROTOCOL_OUT_PROFILE, handleSendProfileRequest(connection))
  yield takeLatest(PROTOCOL_OUT_PING, handleSendPingRequest(connection))
  yield takeLatest(PROTOCOL_OUT_YELL, handleYellRequest(connection))
  yield takeLatest(PROTOCOL_OUT_PRIVATE_MESSAGE, handlePrivateMessageRequest(connection))
  yield takeLatest(PROTOCOL_OUT_CHAT, handleSendChatRequest(connection))
  yield takeLatest(PROTOCOL_OUT_SCENE, handleSendSceneRequest(connection))

  yield fork(pingEveryTenSeconds)

  while (true) {
    const eventFromConnection = yield call(awaitMessage, connection)
    yield put(eventFromConnection)
  }
  // TODO: set broker only on success -- yield put(setBrokerConnection(connection))
}

function delay(timeInMillis: number) {
  const callback = () => new Promise(resolve => setTimeout(resolve, timeInMillis))
  return call(callback)
}

function* pingEveryTenSeconds() {
  while (true) {
    yield delay(10000)
    yield put(protocolOutPing())
  }
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
