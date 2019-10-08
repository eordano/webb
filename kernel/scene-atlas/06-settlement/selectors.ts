import { RootUserPosition } from './types'

export function isPositionSettled(state: RootUserPosition) {
  return state.userPosition.isSettled
}
