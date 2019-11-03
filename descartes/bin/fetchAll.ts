import { DescartesMode } from './basicConfig'
import { descartes } from './main'

let workers = { count: 0 }
const MAX_WORKERS = 20
const currentPromises: Promise<any>[] = []
const promiseAt: Record<string, number> = {}
const data: Record<string, boolean> = {}

export async function fetchAll(mode: DescartesMode, hasData = (x: number, y: number) => !!data[`${x},${y}`]) {
  try {
    for (let ii = 25; ii >= -150; ii--) {
      for (let jj = 150; jj >= -150; jj--) {
        if (workers.count > MAX_WORKERS) {
          await Promise.race(currentPromises.filter(_ => !!_))
        }
        const key = `${ii},${jj}`
        workers.count += 1
        const worker = (async (i: number, j: number) => {
          await (async () => {
            const record = await descartes.getSceneIdForCoordinates([{ x: i - 1, y: j - 1 }, { x: i, y: j }])
            if (!record) return
            if (hasData(i, j)) return
            const scene = record[`${i},${j}`]
            const mapping = await descartes.getMappingForSceneId(scene)
            if (mapping) {
              const cids = Object.keys(mapping)
              const sceneJson = await descartes.getSceneJson(scene)
              for (let parcel of sceneJson.scene.parcels) {
                data[parcel] = true
              }
              if (mode !== 'mappings') {
                for (let id of cids) {
                  await descartes.getContent(mapping[id])
                }
                console.log(`Secured ${cids.length} files for scene ${scene} (${sceneJson.scene.base})`)
              } else {
                const sceneJson = await descartes.getSceneJson(scene)
                await descartes.getContent(mapping[sceneJson.main])
                console.log(`Downloaded scene.json and main file for ${scene} (${sceneJson.scene.base})`)
              }
            }
          })()
          workers.count -= 1
          const indexOfPromise = promiseAt[`${i},${j}`]
          delete currentPromises[indexOfPromise]
        })(ii, jj)
        currentPromises.push(worker)
        promiseAt[key] = currentPromises.length - 1
      }
    }
    await Promise.all([...currentPromises])
  } catch (e) {
    console.log(e)
  }
}
