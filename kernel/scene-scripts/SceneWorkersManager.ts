import { ScriptingTransport } from 'dcl/rpc'
import { IWorker, WebWorkerTransport } from 'dcl/rpc/common/transports/WebWorker'
import { ISceneWorker } from 'dcl/scene-api/interface/ISceneWorker'
import { ISceneManifest } from 'dcl/utils'
import { IRendererParcelSceneAPI } from '../renderer/parcelScene/IRendererParcelSceneAPI'
import { MemoryRendererParcelScene } from '../renderer/parcelScene/MemoryRendererParcelScene'
import { SceneWorker } from './SceneWorker'
import { createWorker } from './Worker'

export type Data<T extends IWorker, R extends IRendererParcelSceneAPI> = {
  getWorker(): T
  getScene(): R
}

export class SceneWorkersManager {
  loadedSceneWorkers = new Map<string, ISceneWorker>()
  sceneManifests = new Map<string, ISceneManifest>()
  public static parcelSceneClass: any = MemoryRendererParcelScene
  public static gamekitPath = './gamekit.js'

  newSceneWorker(scene: ISceneManifest, transport?: ScriptingTransport) {
    const worker = createWorker(scene.id, SceneWorkersManager.gamekitPath)
    if (!transport) {
      transport = WebWorkerTransport(worker)
    }
    const parcelSceneConnector = new SceneWorkersManager.parcelSceneClass(transport, scene)
    const sceneWorker = new SceneWorker(scene, transport, parcelSceneConnector, SceneWorkersManager.gamekitPath)
    parcelSceneConnector.registerWorker(sceneWorker)
    sceneWorker.startSystem()
    return sceneWorker
  }

  getSceneWorkerBySceneID(sceneId: string) {
    return this.loadedSceneWorkers.get(sceneId)
  }

  stopSceneWorker(scene: string | ISceneManifest) {
    const worker = this.loadedSceneWorkers.get(typeof scene === 'string' ? scene : scene.id)
    if (worker && !worker.persistent) {
      this._forceStopSceneWorker(worker)
    }
  }

  forceStopSceneWorker(scene: string | ISceneManifest) {
    const worker = this.loadedSceneWorkers.get(typeof scene === 'string' ? scene : scene.id)
    this._forceStopSceneWorker(worker)
  }

  private _forceStopSceneWorker(worker: ISceneWorker) {
    worker.dispose()
  }

  loadScene(scene: ISceneManifest, transport?: ScriptingTransport): ISceneWorker {
    const sceneId = scene.id

    let worker = this.loadedSceneWorkers.get(sceneId)
    if (!worker) {
      worker = this.newSceneWorker(scene, transport) as any
      this.loadedSceneWorkers.set(sceneId, worker)
      worker.onDisposeObservable.addOnce(() => {
        this.loadedSceneWorkers.delete(sceneId)
      })
    }
    return worker
  }
}
