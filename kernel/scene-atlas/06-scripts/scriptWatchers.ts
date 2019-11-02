import { ISceneWorker } from 'dcl/scene-api/interface/ISceneWorker'
import future from 'fp-future'

export async function watchScriptForAwake(worker: ISceneWorker) {
  await (worker as any).parcelScene.awakePromise
  return true
}

export async function watchRendererForLoaded(worker: ISceneWorker) {
  await (worker as any).parcelScene.readyPromise
  return true
}

export async function watchForSceneDispose(sceneId: string, worker: ISceneWorker) {
  const stop = future<void>()
  worker.onDisposeObservable.addOnce((eventType: any, eventState: any) => {
    stop.resolve()
  })
  await stop
  return sceneId
}
