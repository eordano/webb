import { ScriptingHost } from 'dcl/rpc/host'
import { ISceneWorker } from 'dcl/scene-api/interface/ISceneWorker'
import { EventEmitter } from 'events'
import { future } from 'fp-future'
import { IRendererParcelSceneAPI } from './IRendererParcelSceneAPI'

/**
 * Use this as a mock for a Renderer's Parcel Scene behavior if there is no renderer connected
 */
export class MemoryRendererParcelScene implements IRendererParcelSceneAPI {
  public events = new EventEmitter()
  public worker: ISceneWorker
  public system: ScriptingHost
  public sceneManifest: any

  public awakePromise: Promise<boolean> = future<boolean>()
  public readyPromise: Promise<boolean> = future<boolean>()

  constructor(scene: any) {
    this.sceneManifest = scene
  }

  sendBatch(actions: any[]): Promise<void> {
    console.log('Events from', this.sceneManifest.id, actions)
    if (Array.isArray(actions)) {
      if (actions.reduce((finished, action) => finished || action.type === 'InitMessagesFinished', false)) {
        // Emulating load of scene
        (this.awakePromise as any).resolve(true)
        setTimeout(() => (this.readyPromise as any).resolve(true), Math.random() * 2000)
      }
    }
    return Promise.resolve(undefined)
  }

  registerWorker(worker: ISceneWorker): Promise<void> {
    this.worker = worker
    return Promise.resolve()
  }

  dispose(): void {
  }

  on(event: string, listener: any) {
    this.events.on(event, listener)
  }

  off(event: string, listener: any) {
    this.events.off(event, listener)
  }
}
