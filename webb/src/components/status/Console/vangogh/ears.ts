import { getServerConfigurations } from 'dcl/config'
import { resolvePositionToSceneManifest } from 'dcl/kernel/scene-atlas/resolvePositionToSceneManifest'
import { GamekitScene } from 'dcl/kernel/scene-scripts/userSpace/GamekitScene'
import { SyncedECS } from './SyncedECS'
import { RootStore } from 'dcl/kernel/core/types'

export class PlainGameKit extends GamekitScene {
  constructor(public source: string) {
    super()
  }
  getSource(): Promise<string> {
    return Promise.resolve(this.source)
  }
}

export function RunScene(store: RootStore) {
  return async function(x: string, y: string) {
    const scene = await resolvePositionToSceneManifest(store)(x as any, y as any)

    const gameScript = scene.getCIDForFilePath(scene.main)

    const script = await(await fetch(`${getServerConfigurations().content}/contents/${gameScript}`)).text()

    const kit = new PlainGameKit(script)
    const sync = new SyncedECS(scene)

    kit.engine = sync

    await kit.setupLifecycle()
    await kit.update(0)

    return { kit, sync}
  }
}
