import { ScriptingHost, ScriptingTransport } from 'dcl/rpc'
import { ISceneWorker } from 'dcl/scene-api/interface/ISceneWorker'
import { createLogger, ISceneManifest, Observable } from 'dcl/utils'
import future, { IFuture } from 'fp-future'
import { IRendererParcelSceneAPI } from '../renderer/parcelScene/IRendererParcelSceneAPI'
import { EnvironmentAPI } from './kernelSpace/EnvironmentAPI'
import { RendererParcelSceneToScript } from './kernelSpace/RendererParcelSceneToScript'

const logger = createLogger('SceneWorker')

export class SceneWorker implements ISceneWorker {
  public system: ScriptingHost
  public systemPromise: IFuture<ScriptingHost> = future<ScriptingHost>()
  public startPromise: IFuture<boolean> = future<boolean>()

  public engineAPI: RendererParcelSceneToScript
  public enabled = true

  public persistent = false
  public readonly onDisposeObservable = new Observable<string>()

  public sceneManifest: ISceneManifest

  constructor(
    public transport: ScriptingTransport,
    public parcelScene: IRendererParcelSceneAPI,
    public gamekit?: string
  ) {
    this.sceneManifest = parcelScene.sceneManifest
    if (!this.gamekit) {
      throw new Error(
        `Can't create a SceneWorker without the Gamekit Entrypoint. See SceneWorker.ts for more information`
      )
    }
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

  async startSystem() {
    const system = (this.system = await ScriptingHost.fromTransport(this.transport))
    this.systemPromise.resolve(system)
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
