import { SceneIdString } from '@dcl/kernel/scene-atlas/04-sceneId-resolution/types'
import { SceneMappingRecord } from "./lib/SceneMappingRecord"

export type Descartes = {
  getSceneIdForPosition(x: number, y: number): SceneIdString
  getMappingForSceneId(sceneId: SceneIdString): SceneMappingRecord
  downloadEssentials(sceneId: SceneIdString): Promise<void>
  downloadContents(sceneId: SceneIdString): Promise<void>
  downloadAllEssentials(): Promise<void>
  downloadAllContents(): Promise<void>
}
