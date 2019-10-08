import { parcelSize } from '@dcl/utils'
import { action } from 'typesafe-actions'
import { GridPosition, SET_WORLD_POSITION, WorldPosition } from './types'

export const setGridPosition = (gridPosition: GridPosition) =>
  action(SET_WORLD_POSITION, {
    x: (gridPosition.x + 0.5) * parcelSize,
    y: 0,
    z: (gridPosition.x + 0.5) * parcelSize
  })
export type SetGridPositionAction = ReturnType<typeof setGridPosition>

export const setWorldPosition = (userPosition: WorldPosition) => action(SET_WORLD_POSITION, userPosition)
export type SetWorldAction = ReturnType<typeof setWorldPosition>

export type UserPositionAction = SetWorldAction
