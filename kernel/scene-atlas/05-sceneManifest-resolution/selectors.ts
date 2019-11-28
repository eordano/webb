import { encodeParcelPosition } from 'dcl/utils'
import { RootPositionToSceneIdState } from '../04-sceneId-resolution/types'
import { RootSceneIdToSceneManifestState, SceneIdToSceneManifestState } from './types'

export function needsResolutionToManifest(state: RootSceneIdToSceneManifestState, sceneId: string): boolean {
  return !!sceneId && !state.sceneIdToManifest.scenesById[sceneId] && !state.sceneIdToManifest.errors[sceneId]
}

export function isMappingResolved(state: RootSceneIdToSceneManifestState, sceneId: string): boolean {
  return !!state.sceneIdToManifest.scenesById[sceneId]
}

export function internalNeedsResolution(state: SceneIdToSceneManifestState, position: string) {
  return !!position && !state.scenesById[position] && !state.loading[position] && !state.errors[position]
}

export function getDownloadServer(state: RootSceneIdToSceneManifestState) {
  return state.positionToSceneId.downloadServer
}

export function getSceneManifest(state: RootSceneIdToSceneManifestState, sceneId: string) {
  return sceneId && state.sceneIdToManifest.scenesById[sceneId]
}

export function getSceneError(state: RootSceneIdToSceneManifestState, sceneId: string) {
  return state.sceneIdToManifest.errors[sceneId]
}

export function getBaseParcel(state: RootPositionToSceneIdState & RootSceneIdToSceneManifestState, position: string) {
  const sceneId = state.positionToSceneId.positionToScene[position]
  if (sceneId) {
    if (state.sceneIdToManifest.scenesById[sceneId]) {
      return state.sceneIdToManifest.scenesById[sceneId].baseParcel
    }
  }
}

export function getSceneIdToBaseParcelMap(state: RootSceneIdToSceneManifestState) {
  const keys = Object.keys(state.sceneIdToManifest.scenesById)
  return keys.reduce((cumm: Record<string, string>, sceneId: string) => {
    cumm[sceneId] = encodeParcelPosition(state.sceneIdToManifest.scenesById[sceneId].baseParcel)
    return cumm
  }, {})
}
