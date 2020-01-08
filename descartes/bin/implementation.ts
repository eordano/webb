import { SceneIdString } from 'dcl/kernel/scene-atlas/04-sceneId-resolution/types'
import { Coordinate } from 'dcl/utils'
import { diskPositionToSceneId, diskSavePositionToSceneId } from '../disk/positionToSceneId'
import { diskRawContent, diskSaveRawContent } from '../disk/rawContentData'
import { diskSaveSceneIdMappings, diskSceneIdMappings } from '../disk/sceneIdMappings'
import { Descartes } from '../logic/descartes'
import { FetchFunction } from '../logic/lib/FetchFunction'
import { PositionToSceneIdRecord } from '../logic/lib/PositionToSceneIdRecord'
import { FourCoordinates } from '../logic/lib/validateXY12'
import { resolveWithStrategies } from '../logic/resolveWithStrategies'
import { memoryGetPositionToSceneId, memorySavePositionToSceneId } from "../memory/positionToSceneId"
import { memoryRawContent, memorySaveRawContent } from '../memory/rawContent'
import { netPositionToSceneId } from '../net/positionToSceneId'
import { netRawContentData } from '../net/rawContentData'
import { netSceneIdMappings } from '../net/sceneIdMappings'

export function getDiskAndNet<R, S>(options: { fetchFun: FetchFunction; url: string; storageDirectory: string }) {
  return function diskAndNet(
    diskGet?: (dir: string) => (_: R) => Promise<S>,
    diskSave?: (dir: string) => (_: R, $: S) => Promise<void>,
    netGet?: (_: FetchFunction, url: string) => (_: R) => Promise<S>,
    memoryGet?: (dir: string) => (_: R) => Promise<S>,
    memorySave?: (dir: string) => (_: R, $: S) => Promise<void>
  ) {
    const { storageDirectory, fetchFun, url } = options
    const strategies =
      memoryGet && memorySave
        ? [
            {
              retrieve: memoryGet(storageDirectory),
              save: memorySave(storageDirectory)
            }
          ]
        : []
    if (diskGet && diskSave) {
      strategies.push({
        retrieve: diskGet(storageDirectory),
        save: diskSave(storageDirectory)
      })
    }
    if (netGet) {
      strategies.push({
        retrieve: netGet(fetchFun, url)
      } as any)
    }
    if (!strategies.length) {
      throw new Error('Must define some functions!')
    }
    return resolveWithStrategies(strategies)
  }
}

export function configureDescartes(options: {
  fetchFun: FetchFunction
  url: string
  storageDirectory: string
  disk: boolean
  net: boolean
  memory: boolean
}): Descartes {
  const { disk, net, memory } = options
  const macros = {
    getSceneIdForCoordinates: getDiskAndNet<FourCoordinates, PositionToSceneIdRecord>(options)(
      disk && diskPositionToSceneId,
      disk && diskSavePositionToSceneId,
      net && netPositionToSceneId,
      memory && memoryGetPositionToSceneId,
      memory && memorySavePositionToSceneId
    ),
    getMappingForSceneId: getDiskAndNet<string, Record<string, string>>(options)(
      disk && diskSceneIdMappings,
      disk && diskSaveSceneIdMappings,
      net && netSceneIdMappings
    ),
    getContent: getDiskAndNet<string, Buffer>(options)(
      disk && diskRawContent,
      disk && diskSaveRawContent,
      net && netRawContentData,
      memory && memoryRawContent,
      memory && memorySaveRawContent
    )
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
    getSceneJson: getSceneJsonRetrying(macros)
  }
}
function getSceneJsonRetrying(macros: any) {
  return async function attempt(sceneId: string, retries = 4) {
    if (retries === 0) {
      throw new Error(`Too many retries trying to access resource ${sceneId}`)
    }
    try {
      const mapping = await macros.getMappingForSceneId(sceneId)
      if (mapping) {
        const cid = mapping['scene.json']
        const content = await macros.getContent(cid)
        if (content)
          return JSON.parse(content.toString())
      }
    } catch (e) {
      console.log(e)
      return attempt(sceneId, retries - 1)
    }
  }
}
