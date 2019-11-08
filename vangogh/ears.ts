import { getServerConfigurations } from 'dcl/config'
import { configureStore } from 'dcl/kernel/core/store'
import { resolvePositionToSceneManifest } from 'dcl/kernel/scene-atlas/resolvePositionToSceneManifest'
import fetch from 'node-fetch'
import { SyncedECS } from './SyncedECS'
import { PlainGameKit } from './PlainGameKit'

export async function ears(x: number, y: number) {
  global['fetch'] = fetch

  try {
    const { store, start } = configureStore()
    start()
    store.subscribe(() => {
      // console.log(store.getState())
    })
    const scene = await resolvePositionToSceneManifest(store)(x, y)

    console.log(`Reading scene ${JSON.stringify(scene.id)}`)

    const gameScript = scene.getCIDForFilePath(scene.main)

    const script = await (await fetch(`${getServerConfigurations().content}/contents/${gameScript}`)).text()

    const kit = new PlainGameKit(script)
    const sync = new SyncedECS(scene)

    kit.engine = sync

    await kit.setupLifecycle()
    await kit.update(0)
    await kit.update(0)
    await kit.update(0)

    return sync.ecs
  } catch (e) {
    console.log(e)
    return
  }
}
