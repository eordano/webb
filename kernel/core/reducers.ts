import { combineReducers, Reducer } from 'redux'
/**
 * Begin import reducers
 */
import { authReducer as auth } from '../auth/reducer'
import { commsReducer as comms } from '../comms/reducer'
import { passportsReducer as passports } from '../passports/reducer'
import { rendererReducer as renderer } from '../renderer/reducer'
import { parcelSightReducer as userPosition } from '../scene-atlas/02-parcel-sight/reducer'
import { parcelLoadingReducer as parcelLoading } from '../scene-atlas/03-parcel-status/reducer'
import { positionToSceneIdReducer as positionToSceneId } from '../scene-atlas/04-sceneId-resolution/reducer'
import { sceneIdToSceneManifestReducer as sceneIdToManifest } from '../scene-atlas/05-sceneManifest-resolution/reducer'
import { sceneLifeCycleReducer as sceneLifeCycle } from '../scene-atlas/06-scripts/reducer'
import { settlementReducer as settlement } from '../scene-atlas/07-settlement/reducer'

export const createReducer: any = (otherReducers: Record<string, Reducer> = {}) => {
  return combineReducers({
    auth,
    comms,
    parcelLoading,
    userPosition,
    positionToSceneId,
    sceneIdToManifest,
    sceneLifeCycle,
    renderer,
    settlement,
    passports,
    ...otherReducers
  })
}
