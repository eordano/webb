import { action } from 'typesafe-actions'
import { GridPosition, SET_WORLD_POSITION, USER_ENTERED_COORDINATE, WorldPosition } from './types'

export const userEnteredCoordinate = (gridPosition: GridPosition) => action(USER_ENTERED_COORDINATE, gridPosition)
export type UserEnteredCoordinateAction = ReturnType<typeof userEnteredCoordinate>

export const setWorldPosition = (userPosition: WorldPosition) => action(SET_WORLD_POSITION, userPosition)
export type SetWorldAction = ReturnType<typeof setWorldPosition>

export type UserPositionAction = SetWorldAction | UserEnteredCoordinateAction
