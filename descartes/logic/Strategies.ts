import { FourCoordinates } from './lib/validateXY12'
import { PositionToSceneIdRecord } from './lib/PositionToSceneIdRecord'
import { SceneIdString } from '@dcl/kernel/scene-atlas/04-sceneId-resolution/types'
import { SceneMappingRecord } from './lib/SceneMappingRecord'

export type ResolveFourCoordinatesToSceneId = (_: FourCoordinates) => Promise<PositionToSceneIdRecord>

export type StorePositionRecord = (_: PositionToSceneIdRecord) => Promise<void>

export type RetrieveAndSaveStrategy<R, S> = {
  retrieve?: (_: R) => Promise<S>
  save?: (_: S) => Promise<void>
}

export type PositionToSceneIdStrategy = RetrieveAndSaveStrategy<FourCoordinates, PositionToSceneIdRecord>

export type SceneIdToMappingsStrategy = RetrieveAndSaveStrategy<SceneIdString, SceneMappingRecord>

export type CIDToRawDataStrategy = RetrieveAndSaveStrategy<string, Buffer>