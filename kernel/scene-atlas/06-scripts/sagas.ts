import { put, select, spawn, takeLatest } from 'redux-saga/effects'
import { PARCEL_SIGHT_DELTA } from '../02-parcel-sight/actions'
import { SCENE_BY_ID_SUCCESS } from '../05-sceneManifest-resolution/types'
import { reportSceneSightDelta, SCENE_SIGHT_DELTA, stopScene } from './actions'
import { sceneRunner } from './sceneRunner'
import { getSceneDeltaPositionReport } from './selectors'
import { SceneSightDeltaAction } from './types'

export function* rootSceneLifecycleSaga(): any {
  yield takeLatest(SCENE_BY_ID_SUCCESS, triggerSceneSightDelta)
  yield takeLatest(PARCEL_SIGHT_DELTA, triggerSceneSightDelta)
  yield takeLatest(SCENE_SIGHT_DELTA, evaluateStartScenesAroundNewPosition)
  yield takeLatest(SCENE_SIGHT_DELTA, evaluateUnloadScenes)
}

function* triggerSceneSightDelta() {
  const { updatedSightCount, newlySeenScenes, lostSightScenes } = yield select(getSceneDeltaPositionReport)
  if (newlySeenScenes.length || lostSightScenes.length) {
    const sceneReport = reportSceneSightDelta({ updatedSightCount, newlySeenScenes, lostSightScenes })
    yield put(sceneReport)
  }
}

function* evaluateStartScenesAroundNewPosition(action: SceneSightDeltaAction) {
  for (let scene of action.payload.newlySeenScenes) {
    yield spawn(sceneRunner, scene)
  }
}
function* evaluateUnloadScenes(action: SceneSightDeltaAction) {
  for (let sceneId of action.payload.lostSightScenes) {
    yield put(stopScene(sceneId))
  }
}
