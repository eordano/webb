import { configureStore } from '@dcl/kernel/core/store'
import { resolvePositionToSceneManifest } from '@dcl/kernel/scene-atlas/resolvePositionToSceneManifest'
import { SceneWorkersManager } from '@dcl/kernel/scene-scripts/SceneWorkersManager'
import fetch from 'node-fetch'

async function main() {
  global['fetch'] = fetch

  // TODO: Take these from arguments
  const x = 0
  const y = 0

  try {
    const { store } = configureStore()
    store.subscribe(() => {
      console.log(store.getState())
    })
    const scene = await resolvePositionToSceneManifest(store)(x, y)

    console.log(`Reading scene ${JSON.stringify(scene)}`)

    const sceneRunner = new SceneWorkersManager()
    sceneRunner.loadScene(scene)
  } catch (e) {
    console.log(e)
    return
  }
}

main().catch(console.log)
