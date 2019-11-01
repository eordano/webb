import { allInSight } from '../../scene-atlas/02-parcel-sight/selectors'
import { RootParcelSightState } from '../../scene-atlas/02-parcel-sight/types'
import { getSceneIdToBaseParcelMap } from '../../scene-atlas/05-sceneManifest-resolution/selectors'
import { RootSceneIdToSceneManifestState } from '../../scene-atlas/05-sceneManifest-resolution/types'

export function getCurrentBaseParcels(state: RootSceneIdToSceneManifestState & RootParcelSightState) {
  const sceneIdToBaseParcelMap = getSceneIdToBaseParcelMap(state)
  const currentlySighted = allInSight(state)
  const currentBaseParcels = currentlySighted.map(_ => sceneIdToBaseParcelMap[_]).filter(_ => !!_)
  return currentBaseParcels
}
