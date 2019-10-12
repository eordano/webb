import { SceneIdString } from '@dcl/kernel/scene-atlas/04-sceneId-resolution/types'
import { resolve } from 'path'
import { safeWriteJSON } from '../disk/driver/safeWriteJSON'
import { SceneMappingRecord } from '../logic/lib/SceneMappingRecord'
import { readJSON } from './driver/readJSON'

export function diskSceneIdMappings(dir: string) {
  return async function(_: SceneIdString): Promise<SceneMappingRecord> {
    return (await readJSON(resolve(dir, 'm', _))) as SceneMappingRecord
  }
}

export function diskSaveSceneIdMappings(dir: string) {
  return async function(_: any, mapping: SceneMappingRecord) {
    await safeWriteJSON(resolve(dir, 'm', _), mapping)
  }
}
