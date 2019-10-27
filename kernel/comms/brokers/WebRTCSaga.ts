import { getServerConfigurations } from 'dcl/config'
import { call, put, take } from 'redux-saga/effects'
import { tokenRequest, TokenSuccessAction, TOKEN_SUCCESS } from '../../auth/actions'
import { MessageInput, BasicEphemeralKey } from '../../auth/ephemeral'
import { setBrokerConnection } from '../actions'
import { createWebRTCBroker } from './createWebRTCBroker'

export function* setupWebRTCBroker(): any {
  const coordinatorURL = getServerConfigurations().worldInstanceUrl
  const body = `GET:${coordinatorURL}`
  yield put(tokenRequest())
  const tokenSuccessAction = (yield take(TOKEN_SUCCESS)) as TokenSuccessAction
  const accessToken = tokenSuccessAction.payload.commsToken
  const msg = Buffer.from(body)
  const input = MessageInput.fromMessage(msg)
  const ephemeral = BasicEphemeralKey.generateNewKey(1000000)
  const connection = yield call(async () => createWebRTCBroker(coordinatorURL, input, accessToken, ephemeral))
  yield setBrokerConnection(connection)
}
