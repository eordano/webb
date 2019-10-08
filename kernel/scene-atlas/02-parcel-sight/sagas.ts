import { takeLatest, select, put } from 'redux-saga/effects'
import { parcelSightChanged } from './actions'
import { deltaSighted } from './selectors'
import { SET_WORLD_POSITION } from '../01-user-position/types'

export function* parcelSightSaga(): any {
  yield takeLatest(SET_WORLD_POSITION, handleNewPosition)
}

export function* handleNewPosition(): any {
  yield put(parcelSightChanged(yield select(deltaSighted)))
}
