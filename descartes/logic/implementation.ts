import { Coordinate } from '@dcl/utils'
import { SceneIdString } from 'kernel/scene-atlas/04-sceneId-resolution/types'
import { Descartes } from './descartes'
import { FetchFunction } from './lib/FetchFunction'
import { PositionToSceneIdRecord } from './lib/PositionToSceneIdRecord'
import { SceneMappingRecord } from './lib/SceneMappingRecord'
import { FourCoordinates } from './lib/validateXY12'
import { resolveWithStrategies } from './resolveWithStrategies'

export function configureDescartes(fetchFun: FetchFunction, url: string, storageDirectory: string): Descartes {
  return {
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
      return resolveWithStrategies<FourCoordinates, PositionToSceneIdRecord>([
        {
          retrieve: diskPositionToSceneId(storageDirectory),
          save: diskSavePositionRecord(storageDirectory)
        },
        {
          retrieve: netPositionToSceneId(fetchFun, url)
        }
      ])(coordinatesAsRange)
    },
    getMappingForSceneIds: (_: SceneIdString[]) => {
      return resolveWithStrategies<SceneIdString[], SceneMappingRecord>([
        {
          retrieve: diskContentMapping(storageDirectory),
          save: diskSaveContentMapping(storageDirectory)
        },
        {
          retrieve: netContentMapping(fetchFun, url)
        }
      ])
    },
    getSceneJson: async (sceneId: string) => {
      const mapping = await this.getMappingForSceneIds([sceneId])
      const cid = mapping['scene.json']
      return JSON.parse(await this.getContent(cid))
    },
    getContent: (content: string) => {
      return resolveWithStrategies<string, Buffer>([
        {
          retrieve: diskContent(storageDirectory),
          save: diskSaveContent(storageDirectory)
        },
        {
          retrieve: netContent(fetchFun, url)
        }
      ])
    }
  }
}
