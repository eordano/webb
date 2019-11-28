import { SceneIdString } from 'dcl/kernel/scene-atlas/04-sceneId-resolution/types'
import { resolve } from 'path'
import { safeWriteJSON } from '../disk/driver/safeWriteJSON'
import { SceneMappingRecord } from '../logic/lib/SceneMappingRecord'
import { readJSON } from './driver/readJSON'
import { exists } from './driver/exists'
import crypto from 'crypto';

export function diskSceneIdMappings(dir: string) {
  return async function(_: SceneIdString): Promise<SceneMappingRecord> {
    const path = resolve(dir, 'm', getKey(_))
    if (!exists(path)) {
      return undefined
    }
    return (await readJSON(path)) as SceneMappingRecord
  }
}

function getKey(keyObj: any): string {
  let str: string = keyObj.toString();
  if(str.length > 255) {
    return crypto.createHash('sha256').update(str).digest("hex");
  } else {
    return str;
  }
}

export function diskSaveSceneIdMappings(dir: string) {
  return async function(_: any, mapping: SceneMappingRecord) {
    await safeWriteJSON(resolve(dir, 'm', getKey(_)), mapping)
  }
}
