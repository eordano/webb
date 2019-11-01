import { USE_LOCAL_COMMS } from 'dcl/config'
import { put, select, takeLatest } from 'redux-saga/effects'
import {
  commsSuccessfullyStarted,
  COMMS_DATACHANNEL_RELIABLE,
  COMMS_DATACHANNEL_UNRELIABLE,
  COMMS_STARTED
} from './actions'
import { setupWebRTCBroker } from './brokers/WebRTCSaga'
import { setupCliBroker } from './brokers/WebSocketSaga'
import { shouldAnnounceConnected } from './selectors'

export function* commsSaga(): any {
  yield takeLatest(COMMS_STARTED, handleCommsStart)
  yield takeLatest(COMMS_DATACHANNEL_RELIABLE, checkConnected)
  yield takeLatest(COMMS_DATACHANNEL_UNRELIABLE, checkConnected)
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
