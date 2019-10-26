import { parcelSize } from 'dcl/utils'
import { put, takeLatest } from 'redux-saga/effects'
import { SetWorldAction, userEnteredCoordinate } from './actions'
import { SET_WORLD_POSITION } from './types'

export function* gridPositionSaga(): any {
  yield takeLatest(SET_WORLD_POSITION, handleSetWorldPosition)
}

export function* handleSetWorldPosition(action: SetWorldAction): any {
  const x = Math.floor(action.payload.x / parcelSize)
  const y = Math.floor(action.payload.z / parcelSize)
  yield put(userEnteredCoordinate({ x, y }))
}
