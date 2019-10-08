import { RootParcelSightState, DeltaParcelSightSeeingReport } from './types'
import { GridPosition, StringPosition } from '../01-user-position/types'

export function isAnyParcelInSight(state: RootParcelSightState, parcels: string[]) {
  const currentlySighted = state.userPosition.currentlySightedMap
  for (let parcel of parcels) {
    if (currentlySighted[parcel]) {
      return true
    }
  }
  return false
}

export function isParcelInSight(state: RootParcelSightState, parcel: string): boolean {
  return state.userPosition.currentlySightedMap[parcel]
}

export function getCurrentStringPosition(state: RootParcelSightState): StringPosition {
  return state.userPosition.stringGrid
}

export function getCurrentGridPosition(state: RootParcelSightState): GridPosition {
  return state.userPosition.grid
}

export function deltaSighted(state: RootParcelSightState): DeltaParcelSightSeeingReport {
  return state.userPosition.delta
}

export function newlySighted(state: RootParcelSightState): string[] {
  return state.userPosition.delta.sighted
}

export function allInSight(state: RootParcelSightState): string[] {
  return state.userPosition.currentlySightedList
}
