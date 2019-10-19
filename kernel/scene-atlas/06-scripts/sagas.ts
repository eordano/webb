import future from 'fp-future'
import { put, select, spawn, takeLatest } from 'redux-saga/effects'
import { ISceneWorker } from '../../scene-scripts/interface/ISceneWorker'
import { SceneWorkersManager } from '../../scene-scripts/SceneWorkersManager'
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

export const sceneManager = new SceneWorkersManager()

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

export async function watchScriptForAwake(worker: ISceneWorker) {
  const awake = future<boolean>()
  const system = await (worker as any).system
  system.on('awake', () => {
    console.log(worker.sceneManifest.id, 'awake')
    awake.resolve(true)
  })
  return awake
}

export async function watchRendererForLoaded(worker: ISceneWorker) {
  const loaded = future<boolean>()
  const system = await (worker as any).system
  system.on('loaded', () => {
    console.log(worker.sceneManifest.id, 'loaded')
    loaded.resolve(true)
  })
  return loaded
}

export async function watchForSceneDispose(sceneId: string, worker: ISceneWorker) {
  const stop = future<void>()
  worker.onDisposeObservable.addOnce((eventType: any, eventState: any) => {
    console.log(eventState, eventType)
    stop.resolve()
  })
  await stop
  return sceneId
}
