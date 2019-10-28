import { USE_LOCAL_COMMS } from 'dcl/config'
import { defaultLogger } from 'dcl/utils'
import { call, put, select, takeLatest } from 'redux-saga/effects'
import { getCurrentUserId } from '../auth/selectors'
import { getProfile } from '../passports/selectors'
import { Profile } from '../passports/types'
import { marshalPositionReport } from '../presence/wireTransforms/marshalPositionReport'
import { commsSuccessfullyStarted, COMMS_DATACHANNEL_RELIABLE, COMMS_DATACHANNEL_UNRELIABLE, COMMS_STARTED, ProtocolOutChatAction, ProtocolOutPingAction, ProtocolOutPositionAction, ProtocolOutPrivateMessageAction, ProtocolOutProfileAction, ProtocolOutSceneAction, ProtocolOutYellAction } from './actions'
import { IBrokerConnection } from './brokers/IBrokerConnection'
import { setupWebRTCBroker } from './brokers/WebRTCSaga'
import { setupCliBroker } from './brokers/WebSocketSaga'
import { shouldAnnounceConnected } from './selectors'
import { sendPing } from './senders/broker/ping'
import { sendChatMessage } from './senders/protocol/chat'
import { sendProfileMessage } from './senders/protocol/profile'

export function* commsSaga(): any {
  yield takeLatest(COMMS_STARTED, handleCommsStart)
  yield takeLatest(COMMS_DATACHANNEL_RELIABLE, checkConnected)
  yield takeLatest(COMMS_DATACHANNEL_UNRELIABLE, checkConnected)
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

export function* checkConnected(): any {
  if (yield select(shouldAnnounceConnected)) {
    yield put(commsSuccessfullyStarted())
  }
}