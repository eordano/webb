import { Vector2 } from '@dcl/utils'
import { action } from 'typesafe-actions'

export const SET_POSITION = 'Set Position'
export const setPosition = (position: Vector2) => action(SET_POSITION, position)
export type SetPositionAction = ReturnType<typeof setPosition>

export const CONFIGURE_LINE_OF_SIGHT_RADIUS = 'Configure Line of Sight Radius'
export const configureLineOfSightRadius = (lineOfSightRadius: number) =>
  action(CONFIGURE_LINE_OF_SIGHT_RADIUS, lineOfSightRadius)
export type ConfigureLineOfSightRadiusAction = ReturnType<typeof configureLineOfSightRadius>

export type ParcelSightAction = SetPositionAction | ConfigureLineOfSightRadiusAction
