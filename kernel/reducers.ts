import { combineReducers } from 'redux'
import { RootPositionSettlementState } from './scene-atlas/01-user-position/types'
import { RootParcelSightState } from './scene-atlas/02-parcel-sight/types'
import { RootParcelLoadingState } from './scene-atlas/03-parcel-status/types'
import { RootPositionToSceneIdState } from './scene-atlas/04-sceneId-resolution/types'
import { RootSceneIdToSceneManifestState, SceneByIdAction } from './scene-atlas/05-sceneManifest-resolution/types'
import { RootSceneLifeCycleState, SceneLifeCycleAction } from './scene-runner/types'
import { PositionSettlementAction } from './scene-atlas/01-user-position/actions'
import { ParcelSightAction } from './scene-atlas/02-parcel-sight/actions'
import { ParcelLoadingActionType } from './scene-atlas/03-parcel-status/actions'
import { PositionToSceneIdAction } from './scene-atlas/04-sceneId-resolution/actions'
/**
 * Begin import reducers
 */
import { authReducer as auth } from './auth/reducer'
import { commsReducer as comms, RootCommsState } from './comms/reducer'
import { positionSettlementReducer as positionSettlement } from './scene-atlas/01-user-position/reducer'
import { parcelSightReducer as parcelSight } from './scene-atlas/02-parcel-sight/reducer'
import { parcelLoadingReducer as parcelLoading } from './scene-atlas/03-parcel-status/reducer'
import { positionToSceneIdReducer as positionToSceneId } from './scene-atlas/04-sceneId-resolution/reducer'
import { sceneIdToSceneManifestReducer as sceneIdToManifest } from './scene-atlas/05-sceneManifest-resolution/reducer'
import { sceneLifeCycleReducer as sceneLifeCycle } from './scene-runner/reducer'
import { rendererReducer as renderer } from './renderer/reducer'
import { passportsReducer as passports } from './passports/reducer'
import { RootAuthState } from './auth/types'
import { RootPassportState } from './passports/types'
import { RootRendererState } from './renderer/types'

export type RootState = RootParcelLoadingState &
  RootParcelSightState &
  RootPositionSettlementState &
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
  | PositionSettlementAction
  | SceneByIdAction
  | SceneLifeCycleAction

export const createReducer: any = () => {
  return combineReducers({
    auth,
    comms,
    parcelLoading,
    parcelSight,
    positionSettlement,
    positionToSceneId,
    sceneIdToManifest,
    sceneLifeCycle,
    renderer,
    passports
  })
}
