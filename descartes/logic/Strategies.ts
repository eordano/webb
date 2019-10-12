import { FourCoordinates } from './lib/validateXY12'
import { PositionToSceneIdRecord } from './lib/PositionToSceneIdRecord'

export type ResolveFourCoordinatesToSceneId = (_: FourCoordinates) => Promise<PositionToSceneIdRecord>

export type StorePositionRecord = (_: PositionToSceneIdRecord) => Promise<void>

export type RetrieveAndSaveStrategy = {
  retrieve?: ResolveFourCoordinatesToSceneId
  save?: StorePositionRecord
}
