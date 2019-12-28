import { registerAPI } from 'dcl/rpc'
import { SyncedECS } from 'dcl/vangogh/SyncedECS'
import { SceneWorkersManager } from 'dcl/kernel/scene-scripts/SceneWorkersManager'
import { MemoryRendererParcelScene } from 'dcl/kernel/renderer/parcelScene/MemoryRendererParcelScene'
import { DevTools } from 'dcl/scene-api'

SceneWorkersManager.gamekitPath = '/gamekit/gamekit_bundle.js'
SceneWorkersManager.parcelSceneClass = MemoryRendererParcelScene

export const syncedObjects = { count: 0, systems: {} }

console.log('Loading: ' + DevTools.name)

@registerAPI('EngineAPI')
export class StoreSyncedECS extends SyncedECS {
  startSignal() {
    syncedObjects.count++
    syncedObjects.systems[syncedObjects.count] = this.ecs
    console.log('signal', syncedObjects)
    setTimeout(() => {
      ;(this.rendererParcelSceneAPI as any).readyPromise.resolve()
    }, 768)
    return super.startSignal()
  }
}
