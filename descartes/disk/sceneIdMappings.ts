import { SceneIdString } from '@dcl/kernel/scene-atlas/04-sceneId-resolution/types'
import { resolve } from 'path'
import { safeWriteJSON } from '../disk/driver/safeWriteJSON'
import { SceneMappingRecord } from '../logic/lib/SceneMappingRecord'
import { readJSON } from './driver/readJSON'

export function diskSceneIdMappings(dir: string) {
  return async function(_: SceneIdString[]): Promise<SceneMappingRecord> {
    const mappings = await Promise.all(_.map(async sceneId => {
      const json = await readJSON(resolve(dir, 'm', sceneId))
      return [sceneId, json]
    }) as Promise<[string, SceneMappingRecord]>[])
    return mappings.reduce((cumm, val) => {
      cumm[val[0]] = val[1]
      return cumm
    }, {})
  }
}

export function diskSaveSceneIdMappings(dir: string) {
  return async function(_: any, mapping: SceneMappingRecord) {
    await Promise.all(Object.keys(mapping).map(sceneId => safeWriteJSON(resolve(dir, 'm', sceneId), mapping[sceneId])))
  }
}
