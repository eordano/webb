import { encodeParcelPositionFromCoordinates, ISceneManifest } from 'dcl/utils'
import { Store } from 'redux'
import { positionLoadRequest } from './04-sceneId-resolution/actions'
import { getEmptyStatus, getPositionError, getSceneIdForPosition } from './04-sceneId-resolution/selectors'
import { getSceneManifest } from './05-sceneManifest-resolution/selectors'
import { RootState } from './06-scripts/SceneLifeCycleHelper'

export function resolvePositionToSceneManifest(store: Store<RootState>) {
  return function(x: number, y: number) {
    return new Promise((resolve: (v: ISceneManifest) => void) => {
      const asString = encodeParcelPositionFromCoordinates(x, y)
      function listener() {
        const state = store.getState()
        const sceneId = getSceneIdForPosition(state, asString)
        if (sceneId) {
          const sceneManifest = getSceneManifest(state, sceneId)
          if (sceneManifest) {
            unsubscribe()
            resolve(sceneManifest)
          }
        }
        if (getPositionError(state, asString) || getEmptyStatus(state, asString)) {
          unsubscribe()
          resolve(undefined)
        }
      }
      const unsubscribe = store.subscribe(listener)
      store.dispatch(positionLoadRequest([asString]))
    })
  }
}
