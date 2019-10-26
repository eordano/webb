import { ISceneManifest } from '@dcl/utils'
import { call, delay, put, race, select, spawn, take } from 'redux-saga/effects'
import { getSceneManifest } from '../05-sceneManifest-resolution/selectors'
import { SCENE_BY_ID_SUCCESS } from '../05-sceneManifest-resolution/types'
import {
  rendererSentLoaded,
  sceneLoading,
  sceneRendererError,
  sceneRunning,
  SCENE_STOP,
  scriptSentAwake,
  scriptTimedout
} from './actions'
import { sceneManager } from './sceneManager'
import { watchForSceneDispose, watchRendererForLoaded, watchScriptForAwake } from './scriptWatchers'
import { shouldTriggerLoading } from './selectors'
import { StopScene } from './types'

export function* sceneRunner(input: string | ISceneManifest): any {
  if (!input) {
    return
  }
  const sceneId = typeof input === 'string' ? input : input.id
  const shouldtrigger = yield select(shouldTriggerLoading, sceneId)
  if (shouldtrigger) {
    yield put(sceneLoading(sceneId))
    let scene
    if (typeof input === 'string') {
      scene = yield select(getSceneManifest, sceneId)
      if (!scene) {
        const resolve = yield take(action => action.type === SCENE_BY_ID_SUCCESS && action.payload.sceneId === sceneId)
        scene = resolve.payload.scene
      }
    } else {
      scene = input
    }
    return yield spawn(function* racer() {
      const worker = yield call(() => sceneManager.loadScene(scene))
      const scriptLoad: any = yield race({
        awake: call(watchScriptForAwake, worker),
        timeout: delay(10000)
      })
      if (scriptLoad.awake) {
        yield put(scriptSentAwake(scene.id))
      } else {
        yield put(scriptTimedout(scene.id))
        worker.dispose()
        return
      }
      const rendererLoad: any = yield race({
        load: call(watchRendererForLoaded, worker),
        timeout: delay(10000)
      })
      if (rendererLoad.load) {
        yield put(rendererSentLoaded(scene.id))
      } else {
        console.log('Scene rendering took too long', scene)
        yield put(sceneRendererError(scene.id))
        worker.dispose()
        return
      }
      yield put(sceneRunning(scene.id))
      const result = (yield race({
        sceneError: call(watchForSceneDispose, scene.id, worker),
        stop: take(
          (action: any) => action && action.type === SCENE_STOP && (action as StopScene).payload.sceneId === scene.id
        )
      })) as any
      if (result.stop) {
        worker.dispose()
      }
    })
  }
}
