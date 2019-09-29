import { parseParcelPosition } from '@dcl/utils'
import { put, select, takeLatest } from 'redux-saga/effects'
import { SCENE_RUNNING, SCENE_SCRIPT_SOURCED_FATAL_ERROR } from '../../scene-runner/actions'
import { getSightedScenesRunningReport, isSceneAtPositionRendereable } from '../../scene-runner/selectors'
import { SceneLifeCycleState } from '../../scene-runner/types'
import { settlePosition, TeleportAction, unsettlePosition } from './actions'
import { isPositionSettled } from './selectors'
import { TELEPORT } from './types'
import { SET_POSITION, setPosition } from '../02-parcel-sight/actions'

export function* positionSettlementSaga(): any {
  yield takeLatest(TELEPORT, handleTeleport)
  yield takeLatest(SET_POSITION, tryToSettle)
  yield takeLatest(SCENE_RUNNING, tryToSettle)
  yield takeLatest(SCENE_SCRIPT_SOURCED_FATAL_ERROR, tryToSettle)
}

export function* handleTeleport(action: TeleportAction): any {
  const isRendereable: string = yield select(isSceneAtPositionRendereable, action.payload.position)
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
  yield put(setPosition(parseParcelPosition(action.payload.position)))
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
