import { ParcelSightState } from './types'
import { ParcelSightAction, CONFIGURE_LINE_OF_SIGHT_RADIUS } from './actions'
import { SET_WORLD_POSITION, USER_ENTERED_COORDINATE } from '../01-user-position/types'
import { UserPositionAction } from '../01-user-position/actions'
import { INITIAL_USER_POSITION, userPositionReducer } from '../01-user-position/reducer'
import { parcelsInScope } from './sightRadius/parcelsInScope'

export const INITIAL_PARCEL_SIGHT_STATE: ParcelSightState = {
  ...INITIAL_USER_POSITION,
  lineOfSightRadius: 4,
  currentlySightedList: [],
  currentlySightedMap: {},
  delta: {
    newlySighted: [],
    lostSight: [],
    currentlyInSight: []
  }
}
export function parcelSightReducer(state?: ParcelSightState, action?: ParcelSightAction | UserPositionAction): ParcelSightState {
  const innerState = wrappedPositionReducer(state, action)
  const shouldContinue = shouldUpdateDelta(state, innerState, action)
  if (!shouldContinue) {
    return innerState
  }
  return deltaReducer(innerState, action)
}

function wrappedPositionReducer(state?: ParcelSightState, action?: ParcelSightAction | UserPositionAction): ParcelSightState {
  if (!state) {
    return INITIAL_PARCEL_SIGHT_STATE
  }
  if (!action) {
    return state
  }
  return { ...state, ...userPositionReducer(state, action) }
}

/**
 * Interlude: Simple reducer to deal with 
 */
function shouldUpdateDelta(initialState: ParcelSightState, state: ParcelSightState, action: ParcelSightAction | UserPositionAction): boolean {
  switch (action.type) {
    case CONFIGURE_LINE_OF_SIGHT_RADIUS:
      if (state.lineOfSightRadius === action.payload) {
        return false
      }
      return true
    case USER_ENTERED_COORDINATE:
      const newPosition = state.grid
      if (newPosition.x === initialState.grid.x && newPosition.y === initialState.grid.y && initialState.lineOfSightRadius === state.lineOfSightRadius) {
        return false
      }
  }
  return (action as any).type === CONFIGURE_LINE_OF_SIGHT_RADIUS || action.type === SET_WORLD_POSITION
}

function deltaReducer(state: ParcelSightState, action: ParcelSightAction| UserPositionAction): ParcelSightState {
  const { grid } = state
  const lineOfSightRadius = action.type === CONFIGURE_LINE_OF_SIGHT_RADIUS ? action.payload : state.lineOfSightRadius
  const nextSightedList = parcelsInScope(lineOfSightRadius, grid)
  const nextSightedMap: Record<string, boolean> = {}
  nextSightedList.forEach(pos => (nextSightedMap[pos] = true))

  let { currentlySightedList, currentlySightedMap } = state

  const newlySightedParcels = nextSightedList.filter(parcel => !currentlySightedMap[parcel])
  const newlyHiddenParcels = currentlySightedList.filter(parcel => !nextSightedMap[parcel])
  currentlySightedList = nextSightedList
  currentlySightedMap = nextSightedMap

  const delta = {
    newlySighted: newlySightedParcels,
    lostSight: newlyHiddenParcels,
    currentlyInSight: currentlySightedList
  }
  return {
    ...state,
    currentlySightedList,
    currentlySightedMap,
    delta
  }
}
