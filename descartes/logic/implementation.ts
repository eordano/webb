import { Coordinate } from '@dcl/utils'
import { SceneIdString } from '@dcl/kernel/scene-atlas/04-sceneId-resolution/types'
import { diskPositionToSceneId, diskSavePositionToSceneId } from '../disk/positionToSceneId'
import { diskRawContent, diskSaveRawContent } from '../disk/rawContentData'
import { diskSaveSceneIdMappings, diskSceneIdMappings } from '../disk/sceneIdMappings'
import { netPositionToSceneId } from '../net/positionToSceneId'
import { netRawContentData } from '../net/rawContentData'
import { netSceneIdMappings } from '../net/sceneIdMappings'
import { Descartes } from './descartes'
import { FetchFunction } from './lib/FetchFunction'
import { PositionToSceneIdRecord } from './lib/PositionToSceneIdRecord'
import { SceneMappingRecord } from './lib/SceneMappingRecord'
import { FourCoordinates } from './lib/validateXY12'
import { resolveWithStrategies } from './resolveWithStrategies'

export function configureDescartes(fetchFun: FetchFunction, url: string, storageDirectory: string): Descartes {
  const macros = {
    getSceneIdForCoordinates: resolveWithStrategies<FourCoordinates, PositionToSceneIdRecord>([
      {
        retrieve: diskPositionToSceneId(storageDirectory),
        save: diskSavePositionToSceneId(storageDirectory)
      },
      {
        retrieve: netPositionToSceneId(fetchFun, url)
      }
    ]),
    getMappingForSceneIds: resolveWithStrategies<SceneIdString[], SceneMappingRecord>([
      {
        retrieve: diskSceneIdMappings(storageDirectory),
        save: diskSaveSceneIdMappings(storageDirectory)
      },
      {
        retrieve: netSceneIdMappings(fetchFun, url)
      }
    ]),
    getContent: resolveWithStrategies<string, Buffer>([
      {
        retrieve: diskRawContent(storageDirectory),
        save: diskSaveRawContent(storageDirectory)
      },
      {
        retrieve: netRawContentData(fetchFun, url)
      }
    ])
  }
  return {
    getMappingForSceneIds: macros.getMappingForSceneIds,
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
      const mapping = await macros.getMappingForSceneIds([sceneId])
      const cid = mapping['scene.json']
      return JSON.parse((await macros.getContent(cid)).toString())
    },
  }
}
