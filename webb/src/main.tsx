import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { configured } from './store'
import { setWorldPosition } from 'dcl/kernel/scene-atlas/01-user-position/actions'
import { SceneWorkersManager } from 'dcl/kernel/scene-scripts/SceneWorkersManager'
import { MemoryRendererParcelScene } from 'dcl/kernel/renderer/parcelScene/MemoryRendererParcelScene'
import { registerAPI } from 'dcl/rpc'
import { SyncedECS } from 'dcl/vangogh/SyncedECS'
import { DevTools } from 'dcl/scene-api'

SceneWorkersManager.gamekitPath = '/gamekit/gamekit_bundle.js'
SceneWorkersManager.parcelSceneClass = MemoryRendererParcelScene

const syncedObjects = { count: 0, systems: {} }

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
configured.start()

configured.store.subscribe(() => {
  ReactDOM.render(<pre>{JSON.stringify(configured.store.getState(), null, 2)}</pre>, document.getElementById('root'))
})

configured.store.dispatch(setWorldPosition({ x: 0, y: 0, z: 0 }))
