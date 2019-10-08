import { action } from 'typesafe-actions'
import { DeltaParcelSightSeeingReport } from './types'

export const PARCEL_SIGHT_DELTA = 'Set of sighted parcels changed'
export const parcelSightChanged = (delta: DeltaParcelSightSeeingReport) => action(PARCEL_SIGHT_DELTA, delta)
export type ParcelSightChangedAction = ReturnType<typeof parcelSightChanged>

export const CONFIGURE_LINE_OF_SIGHT_RADIUS = 'Configure Line of Sight Radius'
export const configureLineOfSightRadius = (lineOfSightRadius: number) =>
  action(CONFIGURE_LINE_OF_SIGHT_RADIUS, lineOfSightRadius)
export type ConfigureLineOfSightRadiusAction = ReturnType<typeof configureLineOfSightRadius>

export type ParcelSightAction = ConfigureLineOfSightRadiusAction | ParcelSightChangedAction
