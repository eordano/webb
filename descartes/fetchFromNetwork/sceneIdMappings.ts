import { SceneIdString } from '@dcl/kernel/scene-atlas/04-sceneId-resolution/types'
import { FetchFunction } from '../logic/lib/FetchFunction'

export type SceneMappingRecord = Record<string, string>
export function buildSceneIdMappings(fetchFun: FetchFunction) {
  return function(targetUrl: string) {
    return async function(_: SceneIdString): Promise<SceneMappingRecord> {
      const raw = await fetchFun(`${targetUrl}/parcel_info?cids=_`).then(_ => _.json())
      if (!raw || !raw.data || !raw.data.content || !raw.data.content.contents || !Array.isArray(raw.data.content.contents)) {
        throw new TypeError('Invalid response from server: missing `data` param')
      }
      for (let content of raw.data.content.contents) {
        const keys = Object.keys(content).sort()
        if (keys.length !== 2 || keys[0] !== 'file' || keys[1] !== 'hash') {
          throw new TypeError('Invalid response from server: mapping contains other keys than `file` and `hash`')
        }
      }
      const response = {} as Record<string, string>
      for (let content of raw.data.content.contents) {
          response[content.file] = content.hash
      }
      return response
    }
  }
}
