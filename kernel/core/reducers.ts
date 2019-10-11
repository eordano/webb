import { combineReducers } from 'redux'
/**
 * Begin import reducers
 */
import { authReducer as auth } from '../auth/reducer'
import { RootAuthState } from '../auth/types'
import { commsReducer as comms, RootCommsState } from '../comms/reducer'
import { passportsReducer as passports } from '../passports/reducer'
import { RootPassportState } from '../passports/types'
import { rendererReducer as renderer } from '../renderer/reducer'
import { RootRendererState } from '../renderer/types'
import { ParcelSightAction } from '../scene-atlas/02-parcel-sight/actions'
import { parcelSightReducer as userPosition } from '../scene-atlas/02-parcel-sight/reducer'
import { RootParcelSightState } from '../scene-atlas/02-parcel-sight/types'
import { ParcelLoadingActionType } from '../scene-atlas/03-parcel-status/actions'
import { parcelLoadingReducer as parcelLoading } from '../scene-atlas/03-parcel-status/reducer'
import { RootParcelLoadingState } from '../scene-atlas/03-parcel-status/types'
import { PositionToSceneIdAction } from '../scene-atlas/04-sceneId-resolution/actions'
import { positionToSceneIdReducer as positionToSceneId } from '../scene-atlas/04-sceneId-resolution/reducer'
import { RootPositionToSceneIdState } from '../scene-atlas/04-sceneId-resolution/types'
import { sceneIdToSceneManifestReducer as sceneIdToManifest } from '../scene-atlas/05-sceneManifest-resolution/reducer'
import { RootSceneIdToSceneManifestState, SceneByIdAction } from '../scene-atlas/05-sceneManifest-resolution/types'
import { sceneLifeCycleReducer as sceneLifeCycle } from '../scene-atlas/06-scripts/reducer'
import { RootSceneLifeCycleState, SceneLifeCycleAction } from '../scene-atlas/06-scripts/types'

export type RootState = RootParcelLoadingState &
  RootParcelSightState &
  RootPositionToSceneIdState &
  RootSceneIdToSceneManifestState &
  RootSceneLifeCycleState &
  RootAuthState &
  RootCommsState &
  RootPassportState &
  RootRendererState

export type RootAction =
  | ParcelLoadingActionType
  | ParcelSightAction
  | PositionToSceneIdAction
  | SceneByIdAction
  | SceneLifeCycleAction

export const createReducer: any = () => {
  return combineReducers({
    auth,
    comms,
    parcelLoading,
    userPosition,
    positionToSceneId,
    sceneIdToManifest,
    sceneLifeCycle,
    renderer,
    passports
  })
}
