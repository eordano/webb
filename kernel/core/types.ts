import { Store } from 'redux'
import { RootAuthState } from '../auth/types'
import { RootCommsState } from '../comms/reducer'
import { RootPassportState } from '../passports/types'
import { RootRendererState } from '../renderer/types'
import { ParcelSightAction } from '../scene-atlas/02-parcel-sight/actions'
import { RootParcelSightState } from '../scene-atlas/02-parcel-sight/types'
import { ParcelLoadingActionType } from '../scene-atlas/03-parcel-status/actions'
import { RootParcelLoadingState } from '../scene-atlas/03-parcel-status/types'
import { PositionToSceneIdAction } from '../scene-atlas/04-sceneId-resolution/actions'
import { RootPositionToSceneIdState } from '../scene-atlas/04-sceneId-resolution/types'
import { RootSceneIdToSceneManifestState, SceneByIdAction } from '../scene-atlas/05-sceneManifest-resolution/types'
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

export type RootStore = Store<RootState>
