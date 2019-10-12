import { SceneIdString } from '@dcl/kernel/scene-atlas/04-sceneId-resolution/types'
import { Coordinate, IScene } from '@dcl/utils'
import { PositionToSceneIdRecord } from './lib/PositionToSceneIdRecord'
import { SceneMappingRecord } from './lib/SceneMappingRecord'

export type Descartes = {
  getSceneIdForCoordinates(_: Coordinate[]): Promise<PositionToSceneIdRecord>
  getMappingForSceneId(_: SceneIdString): Promise<SceneMappingRecord>
  getSceneJson(sceneId: string): Promise<IScene>
  getContent(content: string): Promise<Buffer>
}
