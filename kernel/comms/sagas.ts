import { getServerConfigurations, USE_LOCAL_COMMS } from '@dcl/config'
import { createLogger, defaultLogger } from '@dcl/utils'
import { call, put, race, select, take, takeLatest } from 'redux-saga/effects'
import { Auth } from '../auth'
import { tokenRequest, TokenSuccessAction, TOKEN_SUCCESS } from '../auth/actions'
import { EphemeralKey, MessageInput } from '../auth/ephemeral'
import { getCurrentUserId } from '../auth/selectors'
import { getProfile } from '../passports/selectors'
import { Profile } from '../passports/types'
import { getTopicForPosition } from '../presence/mine/getTopicForPosition'
import { marshalPositionReport } from '../presence/wireTransforms/marshalPositionReport'
import { getCurrentPosition } from '../scene-atlas/02-parcel-sight/selectors'
import { store } from '../store'
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
import { CliBrokerConnection } from './brokers/CliBrokerConnection'
import { IBrokerConnection } from './brokers/IBrokerConnection'
import { WebRTCBrokerConnection } from './brokers/WebRTCBrokerConnection'
import { handleMessage } from './handleMessage'
import { sendPing } from './senders/broker/ping'
import { sendChatMessage } from './senders/chat'
import { sendPosition } from './senders/position'
import { sendProfileMessage } from './senders/profile'

export const logger = createLogger('ProtocolConnection')

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

export function handleSendPositionRequest(connection: IBrokerConnection) {
  return function*(action: ProtocolOutPositionAction): any {
    const position = yield select(getCurrentPosition)
    const topic = getTopicForPosition(position)
    sendPosition(connection, topic, marshalPositionReport(action.payload) as any)
  }
}

export function handleSendProfileRequest(connection: IBrokerConnection): any {
  return function*(_: ProtocolOutProfileAction): any {
    const position = yield select(getCurrentPosition)
    const myUserId = yield select(getCurrentUserId)
    const myProfile = (yield select(getProfile, myUserId)) as Profile
    sendProfileMessage(connection, position, myProfile.version)
  }
}

export function handleSendPingRequest(connection: IBrokerConnection): any {
  return function*(_: ProtocolOutPingAction): any {
    sendPing(connection)
  }
}

var currentMessageId = 0
export function handlePrivateMessageRequest(connection: IBrokerConnection): any {
  return function*(action: ProtocolOutPrivateMessageAction): any {
    sendChatMessage(connection, action.payload.to, '' + ++currentMessageId, action.payload.message)
  }
}

export function handleYellRequest(connection: IBrokerConnection): any {
  return function*(action: ProtocolOutYellAction): any {
    yield sendMessageToCurrentPosition(connection, action.payload.message)
  }
}

/**
 * @deprecated
 */
export function handleSendChatRequest(connection: IBrokerConnection): any {
  return function*(action: ProtocolOutChatAction) {
    defaultLogger.debug('sendChatMessage is deprecated -- please use Yell or PrivateMessage')
    yield sendMessageToCurrentPosition(connection, action.payload.message)
  }
}

export function handleSendSceneRequest(connection: IBrokerConnection): any {
  return function*(action: ProtocolOutSceneAction): any {
    yield sendMessageToCurrentPosition(connection, action.payload.message)
  }
}

export function* sendMessageToCurrentPosition(connection: IBrokerConnection, message: string): any {
  const position = yield select(getCurrentPosition)
  sendChatMessage(connection, 'r-' + position, '' + ++currentMessageId, message)
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
  yield setBrokerConnection(new CliBrokerConnection(commsUrl))
}

export function* setupWebRTCBroker(): any {
  const coordinatorURL = getServerConfigurations().worldInstanceUrl
  const body = `GET:${coordinatorURL}`
  const auth = new Auth()
  auth.store = store
  yield put(tokenRequest(auth.getEphemeralKey()))
  const tokenSuccessAction = (yield take(TOKEN_SUCCESS)) as TokenSuccessAction
  const accessToken = tokenSuccessAction.payload.commsToken
  const ephemeral = auth.getEphemeralKey()

  const msg = Buffer.from(body)
  const input = MessageInput.fromMessage(msg)
  const connection = yield call(() => setupNewBrokerConnection(coordinatorURL, input, accessToken, ephemeral, auth))
  yield setBrokerConnection(connection)
}

async function setupNewBrokerConnection(
  coordinatorURL: string,
  input: MessageInput,
  accessToken: string,
  ephemeral: EphemeralKey,
  auth: Auth
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

  return new WebRTCBrokerConnection(url.toString(), auth)
}
