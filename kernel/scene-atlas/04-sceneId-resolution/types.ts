export type coordinateString = string
export type SceneIdString = string

export type PositionToSceneIdState = {
  downloadServer: string
  sceneIdToPositions: Record<SceneIdString, coordinateString[]>
  positionToScene: Record<coordinateString, SceneIdString>
}

export type RootPositionToSceneIdState = {
  positionToSceneId: PositionToSceneIdState
}
