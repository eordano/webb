import { call, fork, put, select, takeLatest } from 'redux-saga/effects'
import { getCurrentUserId } from '../../auth/selectors'
import { getProfile } from '../../passports/selectors'
import { Profile } from '../../passports/types'
import { marshalPositionReport } from '../../presence/wireTransforms/marshalPositionReport'
import {
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
  PROTOCOL_SUBSCRIPTION,
  PROTOCOL_UNSUBSCRIBE
} from '../actions'
import { IBrokerConnection } from '../brokers/IBrokerConnection'
import { getSubscriptions, getMyAlias } from '../selectors'
import { sendPing } from '../senders/broker/ping'
import { sendChatMessage } from '../senders/protocol/chat'
import { sendProfileMessage } from '../senders/protocol/profile'
import { sendSubscriptionUpdate } from '../senders/subscription'
import { awaitMessage } from './awaitMessage'
import { responder } from './responder'
import { WebRTCBrokerConnection } from './WebRTCBrokerConnection'
import { topicForAlias } from '../../comms/senders/topicNames'
import { sendPosition } from '../senders/protocol/position'

export function* dispatcher(url: string): any {
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
  yield fork(rpcForThisConnection.looper)
  while (true) {
    const eventFromConnection = yield call(awaitMessage, connection)
    yield put(eventFromConnection)
  }
  // TODO: set broker only on success -- yield put(setBrokerConnection(connection))
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

export function updateSubscriptions(connection: IBrokerConnection) {
  return function*(): any {
    const subscriptions = yield select(getSubscriptions)
    yield call(sendSubscriptionUpdate, connection, true, subscriptions)
  }
}

export function handleSendPositionRequest(connection: IBrokerConnection) {
  return function*(action: ProtocolOutPositionAction): any {
    if (action.payload.topic) {
      yield call(sendPosition, connection, action.payload.topic, marshalPositionReport(action.payload.positionData) as any)
    } else {
      yield call(sendControlMessageOnOwnChannel, connection, marshalPositionReport(action.payload.positionData) as any)
    }
  }
}

/**
 * @deprecated
 */
export function handleSendChatRequest(connection: IBrokerConnection): any {
  return function*(action: ProtocolOutChatAction) {
    yield call(sendControlMessageOnOwnChannel, connection, action.payload.message)
  }
}

export function handleSendSceneRequest(connection: IBrokerConnection): any {
  return function*(action: ProtocolOutSceneAction): any {
    yield call(sendControlMessageOnOwnChannel, connection, action.payload.message)
  }
}

export function* sendControlMessageOnOwnChannel(connection: IBrokerConnection, message: string): any {
  const alias = yield select(getMyAlias)
  sendChatMessage(connection, topicForAlias(alias), '' + ++currentMessageId, message)
}
