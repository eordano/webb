import { encodeParcelPositionFromCoordinates, ISceneManifest, Vector2 } from '@dcl/utils'
import { EventEmitter } from 'events'
import future from 'fp-future'
import { Store } from 'redux'
import { RootParcelSightState } from '../scene-atlas/02-parcel-sight/types'
import { RootParcelLoadingState } from '../scene-atlas/03-parcel-status/types'
import { positionLoadRequest } from '../scene-atlas/04-sceneId-resolution/actions'
import { getEmptyStatus, getPositionError, getSceneIdForPosition } from '../scene-atlas/04-sceneId-resolution/selectors'
import { RootPositionToSceneIdState } from '../scene-atlas/04-sceneId-resolution/types'
import { getSceneError, getSceneManifest } from '../scene-atlas/05-sceneManifest-resolution/selectors'
import { RootSceneIdToSceneManifestState, sceneByIdRequest } from '../scene-atlas/05-sceneManifest-resolution/types'
import { RootSceneLifeCycleState } from './types'
import { teleportToTarget } from '../scene-atlas/06-settlement/actions'

export type RootState = RootParcelLoadingState &
  RootParcelSightState &
  RootPositionToSceneIdState &
  RootSceneIdToSceneManifestState &
  RootSceneLifeCycleState

export class SceneLifeCycleHelper extends EventEmitter {
  store: Store<RootState>

  async getSceneForCoordinates(x: number, y: number): Promise<ISceneManifest> {
    const sceneId = await this.getSceneIdByCoordinates(x, y)
    return this.getSceneById(sceneId)
  }

  teleport(position: Vector2) {
    this.store.dispatch(teleportToTarget(position))
  }

  protected getSceneById(sceneId: string): Promise<ISceneManifest> {
    const resolved = getSceneManifest(this.store.getState(), sceneId)
    if (resolved) {
      return Promise.resolve(resolved)
    }
    const promise = future<ISceneManifest>()
    const unsubscribe = this.store.subscribe(() => {
      const sceneManifest = getSceneManifest(this.store.getState(), sceneId)
      const sceneError = getSceneError(this.store.getState(), sceneId)
      if (sceneManifest || sceneError) {
        if (sceneManifest) {
          promise.resolve(sceneManifest)
        } else if (sceneError) {
          promise.reject(sceneError)
        }
        unsubscribe()
      }
    })
    this.store.dispatch(sceneByIdRequest(sceneId))
    return promise
  }

  protected getSceneIdByCoordinates(x: number, y: number): Promise<string> {
    const position = encodeParcelPositionFromCoordinates(x, y)
    const resolved = getSceneIdForPosition(this.store.getState(), position)
    if (resolved) {
      return Promise.resolve(resolved)
    }
    const promise = future<string>()
    const unsubscribe = this.store.subscribe(() => {
      const sceneId = getSceneIdForPosition(this.store.getState(), position)
      const idError = getPositionError(this.store.getState(), position)
      const emptyStatus = getEmptyStatus(this.store.getState(), position)
      if (sceneId || idError || emptyStatus) {
        if (sceneId) {
          promise.resolve(sceneId)
        } else if (idError) {
          promise.reject(new Error(`Invalid response for ${position}`))
        } else if (emptyStatus) {
          promise.resolve(undefined)
        }
        unsubscribe()
      }
    })
    this.store.dispatch(positionLoadRequest([position]))
    return promise
  }
}
