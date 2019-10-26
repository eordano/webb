import { encodeParcelPositionFromCoordinates } from 'dcl/utils'
import { AnyAction } from 'redux'
import { UserPositionAction } from './actions'
import { SET_WORLD_POSITION, UserPosition, USER_ENTERED_COORDINATE } from './types'

export const INITIAL_USER_POSITION: UserPosition = {
  world: { x: undefined, y: undefined, z: undefined },
  grid: { x: undefined, y: undefined },
  stringGrid: undefined
}

export function userPositionReducer(state?: UserPosition, action?: UserPositionAction | AnyAction): UserPosition {
  if (!state) {
    return INITIAL_USER_POSITION
  }
  if (!action) {
    return state
  }
  if (action.type === USER_ENTERED_COORDINATE) {
    return {
      ...state,
      grid: action.payload,
      stringGrid: encodeParcelPositionFromCoordinates(action.payload.x, action.payload.y)
    }
  }
  if (action.type === SET_WORLD_POSITION) {
    return {
      ...state,
      world: action.payload
    }
  }
  return state
}
