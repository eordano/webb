import { ParcelSightState } from './types'
import { ParcelSightAction, CONFIGURE_LINE_OF_SIGHT_RADIUS } from './actions'
import { SET_WORLD_POSITION } from '../01-user-position/types'
import { UserPositionAction } from '../01-user-position/actions'
import { INITIAL_USER_POSITION, userPositionReducer } from '../01-user-position/reducer'
import { parcelsInScope } from './sightRadius/parcelsInScope'

export const INITIAL_PARCEL_SIGHT_STATE: ParcelSightState = {
  ...INITIAL_USER_POSITION,
  lineOfSightRadius: 4,
  currentlySightedList: [],
  currentlySightedMap: {},
  delta: {
    sighted: [],
    lostSight: [],
    currentlyInSight: []
  }
}

export function parcelSightReducer(state?: ParcelSightState, action?: ParcelSightAction | UserPositionAction): ParcelSightState {
  if (!state) {
    return INITIAL_PARCEL_SIGHT_STATE
  }
  if (!action) {
    return state
  }
  const newState = (action.type === "Set user position in the 3D world") ? { ...state, ...userPositionReducer(state, action) } : state
  let { lineOfSightRadius, grid } = newState
  const newPosition = grid
  switch (action.type) {
    case CONFIGURE_LINE_OF_SIGHT_RADIUS:
      if (state.lineOfSightRadius === action.payload) {
        return state
      }
      lineOfSightRadius = action.payload
      break
    case SET_WORLD_POSITION:
      if (newPosition.x === state.grid.x && newPosition.y === state.grid.y && state.lineOfSightRadius === newState.lineOfSightRadius) {
        return state
      }
      break
    default:
      return state
  }
  const nextSightedList = parcelsInScope(lineOfSightRadius, newPosition)
  const nextSightedMap: Record<string, boolean> = {}
  nextSightedList.forEach(pos => (nextSightedMap[pos] = true))

  let { currentlySightedList, currentlySightedMap } = state

  const newlySightedParcels = nextSightedList.filter(parcel => !currentlySightedMap[parcel])
  const newlyHiddenParcels = currentlySightedList.filter(parcel => !nextSightedMap[parcel])
  currentlySightedList = nextSightedList
  currentlySightedMap = nextSightedMap

  const delta = {
    sighted: newlySightedParcels,
    lostSight: newlyHiddenParcels,
    currentlyInSight: currentlySightedList
  }
  return {
    ...newState,
    lineOfSightRadius,
    currentlySightedList,
    currentlySightedMap,
    delta
  }
}
