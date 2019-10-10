import  { UserPosition } from '../01-user-position/types'

export interface ParcelSightState extends UserPosition {
  currentlySightedList: string[]
  currentlySightedMap: Record<string, boolean>
  delta: DeltaParcelSightSeeingReport
  lineOfSightRadius: number
} 

export interface RootParcelSightState {
  userPosition: ParcelSightState
}

export type DeltaParcelSightSeeingReport = {
  newlySighted: string[]
  lostSight: string[]
  currentlyInSight: string[]
}

export type MapPositionToBoolean = { [pos: string]: boolean }
