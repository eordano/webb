import { getServerConfigurations } from 'dcl/config'
import { configureStore } from 'dcl/kernel/core/store'
import { resolvePositionToSceneManifest } from 'dcl/kernel/scene-atlas/resolvePositionToSceneManifest'
import { GamekitScene } from 'dcl/kernel/scene-scripts/userSpace/GamekitScene'
import fetch from 'node-fetch'
import { SyncedECS } from './SyncedECS'
import { renderEntity } from './render'

export class PlainGameKit extends GamekitScene {
  constructor(public source: string) {
    super()
  }
  getSource(): Promise<string> {
    return Promise.resolve(this.source)
  }
}

async function main() {
  global['fetch'] = fetch

  const [x, y] = process.argv[process.argv.length - 1].split(',').map(_ => parseInt(_, 10))

  try {
    const { store } = configureStore()
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

    console.log(renderEntity(sync.ecs, '0', ''))

    process.exit(0)
  } catch (e) {
    console.log(e)
    process.exit(1)
    return
  }
}

main().catch(console.log)
