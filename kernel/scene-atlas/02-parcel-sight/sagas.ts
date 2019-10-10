import { put, select, takeLatest } from 'redux-saga/effects'
import { USER_ENTERED_COORDINATE } from '../01-user-position/types'
import { parcelSightChanged } from './actions'
import { deltaSighted } from './selectors'

export function* parcelSightSaga(): any {
  yield takeLatest(USER_ENTERED_COORDINATE, handleNewPosition)
}

export function* handleNewPosition(): any {
  yield put(parcelSightChanged(yield select(deltaSighted)))
}
