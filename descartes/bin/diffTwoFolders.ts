import { IScene } from 'dcl/utils'
import fetch from 'node-fetch'
import { Descartes } from '../logic/descartes'
import { FetchFunction } from '../logic/lib/FetchFunction'
import { newTarget, oldTarget, targetUrl } from './basicConfig'
import { configureDescartes } from './implementation'

function configureOfflineDescartes(fetchFun: FetchFunction, url: string, storageDirectory: string) {
  return configureDescartes({
    fetchFun,
    storageDirectory,
    url,
    disk: true,
    net: false,
    memory: true
  })
}

async function resolveSceneRecords(
  d: Descartes,
  s: Record<string, string>,
  data: Record<string, IScene>,
  key: string,
  x: number,
  y: number
): Promise<number> {
  if (!s[key]) {
    try {
      const sceneIdMap = await d.getSceneIdForCoordinates([{ x: x - 1, y: y - 1 }, { x: x + 1, y: y + 1 }])
      if (!sceneIdMap) {
        return 0
      }
      if (!sceneIdMap[key]) {
        // throw new Error(`error procesing data for ${x}, ${y} (sceneId not found, sceneMap: ${JSON.stringify(sceneIdMap)})`)
        return 0
      }
      const sceneId = sceneIdMap[key]
      const scene = await d.getSceneJson(sceneId)
      if (!scene) {
        // throw new Error(`error procesing data for ${x}, ${y} (sceneId: ${sceneId}, sceneMap: ${JSON.stringify(sceneIdMap)})`)
        return 0
      }
      for (let parcel of scene.scene.parcels) {
        s[parcel] = sceneId
        data[sceneId] = scene
      }
      return scene.scene.parcels.length
    } catch (e) {
      console.log(e)
      return 0
    }
  }
  return 0
}

export const d1 = configureOfflineDescartes(fetch as any, targetUrl, oldTarget)
export const d2 = configureDescartes({
  fetchFun: fetch as any,
  storageDirectory: newTarget,
  url: targetUrl,
  disk: true,
  net: false,
  memory: true
})
const sceneIds1: Record<string, string> = {}
const sceneIds2: Record<string, string> = {}
const sceneData1: Record<string, IScene> = {}
const sceneData2: Record<string, IScene> = {}
{
  ;(async () => {
    try {
      let c1 = 0
      let c2 = 0
      for (let ii = -150; ii <= 150; ii++) {
        for (let jj = -150; jj <= 150; jj++) {
          const key = `${ii},${jj}`
          const ret = await resolveSceneRecords(d1, sceneIds1, sceneData1, key, ii, jj)
          c1 += ret
          c2 += await resolveSceneRecords(d2, sceneIds2, sceneData2, key, ii, jj)
        }
        console.log(`Progress: ${((ii + 150) / 3).toFixed(2)}%, data for ${c1}/90601 and ${c2}/90601`)
      }
      for (let ii = 150; ii >= -150; ii--) {
        for (let jj = 150; jj >= -150; jj--) {
          const key = `${ii},${jj}`
          if (sceneIds1[key] !== sceneIds2[key]) {
            console.log(
              `  { "parcel": "${key}", "oldSceneId": ${sceneIds1[key]}, "sceneId": "${
                sceneIds2[key]
              }", "scene": ${JSON.stringify(sceneData2[sceneIds2[key]])} },`
            )
          }
        }
      }
    } catch (e) {
      console.log(e)
    }
    process.exit(0)
  })().catch(e => {
    console.log(e)
    process.exit(1)
  })
}
