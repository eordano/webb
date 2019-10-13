import { SceneIdString } from '@dcl/kernel/scene-atlas/04-sceneId-resolution/types'
import { FetchFunction } from '../logic/lib/FetchFunction'

export type SceneMappingRecord = Record<string, string>

export function netSceneIdMappings(fetchFun: FetchFunction, targetUrl: string) {
  return async function(sceneId: SceneIdString): Promise<SceneMappingRecord> {
    const req = await fetchFun(`${targetUrl}/parcel_info?cids=${sceneId}`)
    const raw = await req.json()
    if (
      !raw ||
      !raw.data ||
      !raw.data[0] ||
      !raw.data[0].content ||
      !raw.data[0].content.contents ||
      !Array.isArray(raw.data[0].content.contents)
    ) {
      throw new TypeError('Invalid response from server: missing `data` param')
    }
    for (let content of raw.data[0].content.contents) {
      const keys = Object.keys(content).sort()
      if (keys.length !== 2 || keys[0] !== 'file' || keys[1] !== 'hash') {
        throw new TypeError('Invalid response from server: mapping contains other keys than `file` and `hash`')
      }
    }
    const response = {} as Record<string, string>
    for (let content of raw.data[0].content.contents) {
      response[content.file] = content.hash
    }
    return response
  }
}
