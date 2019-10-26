import { SceneIdString } from 'dcl/kernel/scene-atlas/04-sceneId-resolution/types'
import { Coordinate } from 'dcl/utils'
import { diskPositionToSceneId, diskSavePositionToSceneId } from '../disk/positionToSceneId'
import { diskRawContent, diskSaveRawContent } from '../disk/rawContentData'
import { diskSaveSceneIdMappings, diskSceneIdMappings } from '../disk/sceneIdMappings'
import { Descartes } from '../logic/descartes'
import { FetchFunction } from '../logic/lib/FetchFunction'
import { resolveWithStrategies } from '../logic/resolveWithStrategies'
import { netPositionToSceneId } from '../net/positionToSceneId'
import { netRawContentData } from '../net/rawContentData'
import { netSceneIdMappings } from '../net/sceneIdMappings'

export function configureDescartes(fetchFun: FetchFunction, url: string, storageDirectory: string): Descartes {
  function diskAndNet<R, S>(
    diskGet: (dir: string) => (_: R) => Promise<S>,
    diskSave: (dir: string) => (_: R, $: S) => Promise<void>,
    netGet: (_: FetchFunction, url: string) => (_: R) => Promise<S>
  ) {
    return resolveWithStrategies([
      {
        retrieve: diskGet(storageDirectory),
        save: diskSave(storageDirectory)
      },
      {
        retrieve: netGet(fetchFun, url)
      }
    ])
  }

  const macros = {
    getSceneIdForCoordinates: diskAndNet(diskPositionToSceneId, diskSavePositionToSceneId, netPositionToSceneId),
    getMappingForSceneId: diskAndNet(diskSceneIdMappings, diskSaveSceneIdMappings, netSceneIdMappings),
    getContent: diskAndNet(diskRawContent, diskSaveRawContent, netRawContentData)
  }
  return {
    getMappingForSceneId: (sceneId: SceneIdString) => macros.getMappingForSceneId(sceneId),
    getContent: macros.getContent,
    getSceneIdForCoordinates: (_: Coordinate[]) => {
      const coordinatesAsRange = _.reduce(
        (prev, coord) => {
          return {
            x1: Math.min(prev.x1, coord.x),
            x2: Math.max(prev.x2, coord.x),
            y1: Math.min(prev.y1, coord.y),
            y2: Math.max(prev.y2, coord.y)
          }
        },
        {
          x1: Infinity,
          x2: -Infinity,
          y1: Infinity,
          y2: -Infinity
        }
      )
      return macros.getSceneIdForCoordinates(coordinatesAsRange)
    },
    getSceneJson: async (sceneId: string) => {
      const mapping = await macros.getMappingForSceneId(sceneId)
      if (mapping) {
        const cid = mapping['scene.json']
        return JSON.parse((await macros.getContent(cid)).toString())
      }
    }
  }
}
