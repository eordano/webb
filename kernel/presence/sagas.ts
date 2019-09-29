import { select, takeLatest } from 'redux-saga/effects'
import {
  ProtocolPingAction,
  PROTOCOL_CHAT,
  PROTOCOL_PING,
  PROTOCOL_POSITION,
  PROTOCOL_PROFILE,
  PROTOCOL_SCENE
} from '../comms/actions'
import { SETTLE_POSITION } from '../scene-atlas/01-user-position/types'
import { UNSETTLE_POSITION } from '../scene-atlas/01-user-position/types'
import { SET_POSITION } from '../scene-atlas/02-parcel-sight/actions'
import { allInSight } from '../scene-atlas/02-parcel-sight/selectors'

export function* presenceSaga(): any {
  yield takeLatest(PROTOCOL_PING, handleIncomingPing)
  yield takeLatest(PROTOCOL_PROFILE, handleIncomingPing)
  yield takeLatest(PROTOCOL_CHAT, handleIncomingPing)
  yield takeLatest(PROTOCOL_POSITION, handleIncomingPing)
  yield takeLatest(PROTOCOL_SCENE, handleIncomingPing)

  yield takeLatest(SETTLE_POSITION, subscribeAround)
  yield takeLatest(UNSETTLE_POSITION, handleNeedToUnsubscribe)
  yield takeLatest(SET_POSITION, subscribeAround)

  yield takeLatest(SETTLE_POSITION, subscribeAround)
  yield takeLatest(UNSETTLE_POSITION, handleNeedToUnsubscribe)
  yield takeLatest(SET_POSITION, subscribeAround)
}

function* handleIncomingPing(ping: ProtocolPingAction) {
  console.log(ping.payload.ping)
}

function* subscribeAround() {
  const { delta, currentlySighted } = yield select(allInSight)
  return [delta, currentlySighted]
}

function* handleNeedToUnsubscribe() {}
