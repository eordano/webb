import { DescartesMode } from './basicConfig'
import { descartes } from './main'

export async function fetchAll(mode: DescartesMode) {
  for (let i = 150; i >= -150; i--) {
    for (let j = 150; j >= -150; j--) {
      const record = await descartes.getSceneIdForCoordinates([{ x: i - 1, y: j - 1 }, { x: i, y: j }])
      if (!record) continue
      const scene = record[`${i},${j}`]
      const mapping = await descartes.getMappingForSceneId(scene)
      if (mapping) {
        const cids = Object.keys(mapping)
        if (mode !== 'mappings') {
          for (let id of cids) {
            await descartes.getContent(mapping[id])
          }
          const sceneJson = await descartes.getSceneJson(scene)
          console.log(`Secured ${cids.length} files for scene ${scene} (${sceneJson.scene.base})`)
        } else {
          const sceneJson = await descartes.getSceneJson(scene)
          await descartes.getContent(mapping[sceneJson.main])
          console.log(`Downloaded scene.json and main file for ${scene} (${sceneJson.scene.base})`)
        }
      }
    }
  }
}
