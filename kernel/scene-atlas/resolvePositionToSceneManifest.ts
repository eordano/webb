import { encodeParcelPositionFromCoordinates, ISceneManifest } from '@dcl/utils'
import { Store } from 'redux'
import { getSceneIdForPosition } from './04-sceneId-resolution/selectors'
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
      }
      const unsubscribe = store.subscribe(listener)
    })
  }
}
