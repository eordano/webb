import { RootParcelSightState, DeltaParcelSightSeeingReport } from './types'

export function isAnyParcelInSight(state: RootParcelSightState, parcels: string[]) {
  const currentlySighted = state.parcelSight.currentlySightedMap
  for (let parcel of parcels) {
    if (currentlySighted[parcel]) {
      return true
    }
  }
  return false
}

export function isParcelInSight(state: RootParcelSightState, parcel: string): boolean {
  return state.parcelSight.currentlySightedMap[parcel]
}

export function getCurrentPosition(state: RootParcelSightState) {
  return state.parcelSight.isTargetPlaced ? state.parcelSight.currentPosition! : null
}

export function deltaSighted(state: RootParcelSightState): DeltaParcelSightSeeingReport {
  return state.parcelSight.delta
}

export function newlySighted(state: RootParcelSightState): string[] {
  return state.parcelSight.delta.sighted
}

export function allInSight(state: RootParcelSightState): string[] {
  return state.parcelSight.currentlySightedList
}
