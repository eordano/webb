import { combineReducers, Reducer } from 'redux'
/**
 * Begin import reducers
 */
import { passportsReducer as passports } from '../passports/reducer'
import { rendererReducer as renderer } from '../renderer/reducer'
import { parcelSightReducer as userPosition } from '../scene-atlas/02-parcel-sight/reducer'
import { parcelLoadingReducer as parcelLoading } from '../scene-atlas/03-parcel-status/reducer'
import { positionToSceneIdReducer as positionToSceneId } from '../scene-atlas/04-sceneId-resolution/reducer'
import { presenceReducer as presence } from '../presence/reducer'
import { sceneIdToSceneManifestReducer as sceneIdToManifest } from '../scene-atlas/05-sceneManifest-resolution/reducer'
import { sceneLifeCycleReducer as sceneLifeCycle } from '../scene-atlas/06-scripts/reducer'
import { settlementReducer as settlement } from '../scene-atlas/07-settlement/reducer'

export const createReducer: any = (otherReducers: Record<string, Reducer> = {}) => {
  return combineReducers({
    parcelLoading,
    userPosition,
    positionToSceneId,
    sceneIdToManifest,
    sceneLifeCycle,
    renderer,
    presence,
    settlement,
    passports,
    ...otherReducers
  })
}
