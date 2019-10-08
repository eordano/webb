import { UserPosition, SET_WORLD_POSITION } from './types'
import { UserPositionAction } from './actions'
import { worldToGrid, MVector2, encodeParcelPosition } from '@dcl/utils'

export const INITIAL_USER_POSITION: UserPosition = {
  world: { x: 0, y: 0, z: 0 },
  grid: { x: 0, y: 0 },
  stringGrid: '0,0',
}

const tempVector = new MVector2(0, 0)

export function userPositionReducer(
  state?: UserPosition,
  action?: UserPositionAction
): UserPosition {
  if (!state) {
    return INITIAL_USER_POSITION
  }
  if (!action) {
    return state
  }
  switch(action.type) {
    case SET_WORLD_POSITION:
      worldToGrid(action.payload, tempVector)
      const { x, y } = tempVector
      return {
        grid: { x, y },
        world: action.payload,
        stringGrid: encodeParcelPosition(tempVector)
      }
    default:
      return state
  }
}
