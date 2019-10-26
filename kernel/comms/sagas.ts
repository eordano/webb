import { getServerConfigurations, USE_LOCAL_COMMS } from '@dcl/config'
import { defaultLogger } from '@dcl/utils'
import { call, put, race, select, take, takeLatest } from 'redux-saga/effects'
import { tokenRequest, TokenSuccessAction, TOKEN_SUCCESS } from '../auth/actions'
import { MessageInput } from '../auth/ephemeral'
import { getCurrentUserId } from '../auth/selectors'
import { getProfile } from '../passports/selectors'
import { Profile } from '../passports/types'
import { marshalPositionReport } from '../presence/wireTransforms/marshalPositionReport'
import {
  CLOSE_COMMS,
  COMMS_STARTED,
  ProtocolOutChatAction,
  ProtocolOutPingAction,
  ProtocolOutPositionAction,
  ProtocolOutPrivateMessageAction,
  ProtocolOutProfileAction,
  ProtocolOutSceneAction,
  ProtocolOutYellAction,
  PROTOCOL_OUT_CHAT,
  PROTOCOL_OUT_PING,
  PROTOCOL_OUT_POSITION,
  PROTOCOL_OUT_PRIVATE_MESSAGE,
  PROTOCOL_OUT_PROFILE,
  PROTOCOL_OUT_SCENE,
  PROTOCOL_OUT_YELL,
  setBrokerConnection,
  SetBrokerConnectionAction,
  SET_BROKER_CONNECTION
} from './actions'
import { createWebRTCBroker } from './brokers/createWebRTCBroker'
import { IBrokerConnection } from './brokers/IBrokerConnection'
import { WebSocketBrokerConnection } from './brokers/WebSocketBrokerConnection'
import { handleMessage } from './handleMessage'
import { sendPing } from './senders/broker/ping'
import { sendChatMessage } from './senders/protocol/chat'
import { sendProfileMessage } from './senders/protocol/profile'

export function* commsSaga(): any {
  yield takeLatest(COMMS_STARTED, handleCommsStart)
  yield takeLatest(SET_BROKER_CONNECTION, function*(connectionAction: SetBrokerConnectionAction) {
    const connection = connectionAction.payload
    yield takeLatest(PROTOCOL_OUT_POSITION, handleSendPositionRequest(connection))
    yield takeLatest(PROTOCOL_OUT_PROFILE, handleSendProfileRequest(connection))
    yield takeLatest(PROTOCOL_OUT_PING, handleSendPingRequest(connection))
    yield takeLatest(PROTOCOL_OUT_YELL, handleYellRequest(connection))
    yield takeLatest(PROTOCOL_OUT_PRIVATE_MESSAGE, handlePrivateMessageRequest(connection))
    yield takeLatest(PROTOCOL_OUT_CHAT, handleSendChatRequest(connection))
    yield takeLatest(PROTOCOL_OUT_SCENE, handleSendSceneRequest(connection))

    connection.onMessageObservable.add(handleMessage)

    yield race([SET_BROKER_CONNECTION, CLOSE_COMMS])

    connection.close()
  })
}

export function handleSendProfileRequest(connection: IBrokerConnection): any {
  return function*(_: ProtocolOutProfileAction): any {
    const myUserId = yield select(getCurrentUserId)
    const myProfile = (yield select(getProfile, myUserId)) as Profile
    yield call(sendProfileMessage, connection, _.payload.topics.join(' '), myProfile.version)
  }
}

export function handleSendPingRequest(connection: IBrokerConnection): any {
  return function*(_: ProtocolOutPingAction): any {
    yield call(sendPing, connection)
  }
}

var currentMessageId = 0
export function handlePrivateMessageRequest(connection: IBrokerConnection): any {
  return function*(action: ProtocolOutPrivateMessageAction): any {
    yield call(
      sendChatMessage,
      connection,
      'inbox-' + action.payload.to,
      '' + ++currentMessageId,
      action.payload.message
    )
  }
}

export function handleYellRequest(connection: IBrokerConnection): any {
  return function*(action: ProtocolOutYellAction): any {
    yield call(sendControlMessageOnOwnChannel, connection, action.payload.message)
  }
}

export function handleSendPositionRequest(connection: IBrokerConnection) {
  return function*(action: ProtocolOutPositionAction): any {
    yield call(sendControlMessageOnOwnChannel, connection, marshalPositionReport(action.payload) as any)
  }
}

/**
 * @deprecated
 */
export function handleSendChatRequest(connection: IBrokerConnection): any {
  return function*(action: ProtocolOutChatAction) {
    defaultLogger.debug('sendChatMessage is deprecated -- please use Yell or PrivateMessage')
    yield call(sendControlMessageOnOwnChannel, connection, action.payload.message)
  }
}

export function handleSendSceneRequest(connection: IBrokerConnection): any {
  return function*(action: ProtocolOutSceneAction): any {
    yield call(sendControlMessageOnOwnChannel, connection, action.payload.message)
  }
}

export function* sendControlMessageOnOwnChannel(connection: IBrokerConnection, message: string): any {
  const userId = yield select(getCurrentUserId)
  sendChatMessage(connection, userId, '' + ++currentMessageId, message)
}

export function* handleCommsStart(): any {
  if (USE_LOCAL_COMMS) {
    yield setupCliBroker()
  } else {
    yield setupWebRTCBroker()
  }
}

export function* setupCliBroker(): any {
  const commsUrl = document.location.toString().replace(/^http/, 'ws')
  defaultLogger.log('Using WebSocket comms: ' + commsUrl)
  yield setBrokerConnection(new WebSocketBrokerConnection(commsUrl))
}

export function* setupWebRTCBroker(): any {
  const coordinatorURL = getServerConfigurations().worldInstanceUrl
  const body = `GET:${coordinatorURL}`
  yield put(tokenRequest())
  const tokenSuccessAction = (yield take(TOKEN_SUCCESS)) as TokenSuccessAction
  const accessToken = tokenSuccessAction.payload.commsToken

  const msg = Buffer.from(body)
  const input = MessageInput.fromMessage(msg)
  const connection = yield call(async () => createWebRTCBroker(coordinatorURL, input, accessToken, null as any))
  yield setBrokerConnection(connection)
}
