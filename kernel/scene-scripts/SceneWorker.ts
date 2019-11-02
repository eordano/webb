import { ScriptingHost, ScriptingTransport, WebWorkerTransport } from 'dcl/rpc'
import { createLogger, ISceneManifest, Observable } from 'dcl/utils'
import future, { IFuture } from 'fp-future'
import { IRendererParcelSceneAPI } from '../renderer/parcelScene/IRendererParcelSceneAPI'
import { ISceneWorker } from './interface/ISceneWorker'
import { createWorker } from './Worker'

import { EnvironmentAPI } from './kernelSpace/EnvironmentAPI'
import { RendererParcelSceneToScript } from './kernelSpace/RendererParcelSceneToScript'
import { DevTools } from 'dcl/scene-api/lib/DevTools'

console.log(`Using ${DevTools} as Devtools`)

const logger = createLogger('SceneWorker')

export class SceneWorker implements ISceneWorker {
  public system: ScriptingHost
  public systemPromise: IFuture<ScriptingHost> = future<ScriptingHost>()

  public engineAPI: RendererParcelSceneToScript
  public enabled = true

  public persistent = false
  public readonly onDisposeObservable = new Observable<string>()

  public sceneManifest: ISceneManifest

  constructor(public parcelScene: IRendererParcelSceneAPI, public transport: ScriptingTransport, public gamekit?: string) {
    this.sceneManifest = parcelScene.sceneManifest
    parcelScene.registerWorker(this)
  }

  dispose() {
    if (this.enabled) {
      this.enabled = false

      // Unmount the system
      if (this.systemPromise) {
        this.systemPromise.then(() => this.unmountSystem()).catch(e => logger.error('Unable to unmount system', e))
      }

      this.parcelScene.dispose()

      this.onDisposeObservable.notifyObservers(this.sceneManifest.id)
    }
  }

  async loadSystem(): Promise<ScriptingHost> {
    if (!this.gamekit) {
      throw new Error(
        `Can't create a SceneWorker without the Gamekit Entrypoint. See SceneWorker.ts for more information`
      )
    }
    const worker = createWorker(this.sceneManifest.id, this.gamekit)
    this.transport = this.transport || WebWorkerTransport(worker)
    return this.startSystem()
  }

  private async startSystem() {
    const system = this.system = await ScriptingHost.fromTransport(this.transport)
    this.transport = this.transport

    this.engineAPI = system.getAPIInstance('EngineAPI') as any
    this.engineAPI.rendererParcelSceneAPI = this.parcelScene

    system.getAPIInstance(EnvironmentAPI).sceneManifest = this.parcelScene.sceneManifest

    system.enable()

    return system
  }

  async unmountSystem() {
    if (this.systemPromise.isPending) {
      await this.systemPromise
    }
    if (this.system) {
      this.system.unmount()
    }
  }
}
