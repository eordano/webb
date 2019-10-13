import fetch from 'node-fetch'
import { configureDescartes } from './implementation'

const env = process.env.DECENTRALAND_ENV || 'org'
const target: string = process.env.DESCARTES_TARGET || process.env.PWD + '/data'
const mode: DescartesMode = (process.env.DESCARTES_MODE || 'mappings') as DescartesMode

export type DescartesMode = 'mappings' | 'content'

const targetUrl = env.length <= 4 ? `https://content.decentraland.${env}` : env
export type StringCoordinate = string
export type SceneId = string

const descartes = configureDescartes(fetch as any, targetUrl, target)
;(async function() {
  for (let i = -150; i <= 150; i++) {
    for (let j = -150; j <= 150; j++) {
      const record = await descartes.getSceneIdForCoordinates([{ x: i -1, y: j -1 }, { x: i, y: j}])
      if (!record) continue
      const scene = record[`${i},${j}`]
      const mapping = await descartes.getMappingForSceneId(scene)
      if (mapping) {
        const cids = Object.keys(mapping)
        if (mode !== 'mappings') {
          for (let id of cids) {
            await descartes.getContent(mapping[id])
          }
          console.log(`Secured ${cids.length} files for scene ${scene}`)
        } else {
          const sceneJson = await descartes.getSceneJson(scene)
          await descartes.getContent(mapping[sceneJson.main])
          console.log(`Downloaded scene.json and main file for ${scene} (${sceneJson.scene.base})`)
        }
      }
    }
  }
})().catch(e => console.log(e))
