import { Buffer } from 'buffer'
import { getServerConfigurations } from 'dcl/config'
import { call, fork, put, take } from 'redux-saga/effects'
import {
  ephemeralGet,
  EphemeralPresent,
  EPHEMERAL_PRESENT,
  tokenRequest,
  TokenSuccessAction,
  TOKEN_SUCCESS
} from '../../auth/actions'
import { EphemeralKey, MessageInput } from '../../auth/ephemeral'
import { dispatcher } from './dispatcher'

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
