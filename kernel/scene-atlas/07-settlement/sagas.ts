import { put, select, takeLatest } from 'redux-saga/effects'
import { encodeParcelPositionFromCoordinates } from '@dcl/utils'
import { userEnteredCoordinate } from '../01-user-position/actions'
import { SET_WORLD_POSITION } from '../01-user-position/types'
import { SCENE_RUNNING, SCENE_SCRIPT_SOURCED_FATAL_ERROR } from '../06-scripts/actions'
import { getSightedScenesRunningReport, isSceneAtPositionRendereable } from '../06-scripts/selectors'
import { SceneLifeCycleState } from '../06-scripts/types'
import { settlePosition, TeleportAction, unsettlePosition } from './actions'
import { isPositionSettled } from './selectors'
import { TELEPORT } from './types'

export function* positionSettlementSaga(): any {
  yield takeLatest(TELEPORT, handleTeleport)
  yield takeLatest(SET_WORLD_POSITION, tryToSettle)
  yield takeLatest(SCENE_RUNNING, tryToSettle)
  yield takeLatest(SCENE_SCRIPT_SOURCED_FATAL_ERROR, tryToSettle)
}

export function* handleTeleport(action: TeleportAction): any {
  const isRendereable: boolean = yield select(
    isSceneAtPositionRendereable,
    encodeParcelPositionFromCoordinates(
      action.payload.teleportTarget.x, action.payload.teleportTarget.y
    )
  )
  if (isRendereable) {
    const isSettled = yield select(isPositionSettled)
    if (!isSettled) {
      yield put(settlePosition())
    }
  } else {
    if (yield select(isPositionSettled)) {
      yield put(unsettlePosition())
    }
  }
  yield put(userEnteredCoordinate(action.payload.teleportTarget))
}

export function* tryToSettle(): any {
  const hasSettled = yield select(isPositionSettled)
  if (!hasSettled) {
    const currentSceneStatus = yield select(getSightedScenesRunningReport)
    if (canPositionSettle(currentSceneStatus)) {
      yield put(settlePosition())
    }
  }
}

export function canPositionSettle(currentSceneStatus: SceneLifeCycleState): boolean {
  const sighted = Object.keys(currentSceneStatus)
  if (!sighted.length) {
    return false
  }
  for (let sceneId of sighted) {
    if (currentSceneStatus[sceneId] !== 'running' && currentSceneStatus[sceneId] !== 'error') {
      return false
    }
  }
  return true
}
