import { Buffer } from 'buffer'
import { getServerConfigurations } from 'dcl/config'
import { call, spawn, put, take } from 'redux-saga/effects'
import {
  ephemeralGet,
  EphemeralPut,
  EPHEMERAL_PUT,
  tokenRequest,
  TokenSuccessAction,
  TOKEN_SUCCESS
} from '../../auth/actions'
import { MessageInput } from '../../auth/ephemeral'
import { setBrokerConnection } from '../actions'
import { createWebRTCBroker } from './createWebRTCBroker'
import { IBrokerConnection } from './IBrokerConnection'

export function* setupWebRTCBroker(): any {
  const coordinatorURL = getServerConfigurations().worldInstanceUrl
  const body = `GET:${coordinatorURL}`
  yield put(tokenRequest())
  const tokenSuccessAction = (yield take(TOKEN_SUCCESS)) as TokenSuccessAction
  const accessToken = tokenSuccessAction.payload.commsToken
  const msg = Buffer.from(body)
  const input = MessageInput.fromMessage(msg)
  yield put(ephemeralGet())
  const ephemeral = ((yield take(EPHEMERAL_PUT)) as EphemeralPut).payload.token
  const connection = yield call(createWebRTCBroker, coordinatorURL, input, accessToken, ephemeral)
  yield spawn(dispatcher, connection)
  yield put(setBrokerConnection(connection))
}

export function* dispatcher(connection: IBrokerConnection): any {
  while (true) {
    const message = yield call(awaitMessage, connection)
    yield put(message)
  }
}

export async function awaitMessage(connection: IBrokerConnection) {
  return new Promise(resolve => {
    connection.onUpdateObservable.addOnce(resolve)
  })
}
