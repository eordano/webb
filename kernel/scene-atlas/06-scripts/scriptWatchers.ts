import future from 'fp-future'
import { ISceneWorker } from '../../scene-scripts/interface/ISceneWorker'

export async function watchScriptForAwake(worker: ISceneWorker) {
  const awake = future<boolean>()
  const system = await (worker as any).system
  system.on('awake', () => {
    console.log(worker.sceneManifest.id, 'awake')
    awake.resolve(true)
  })
  return awake
}

export async function watchRendererForLoaded(worker: ISceneWorker) {
  const loaded = future<boolean>()
  const system = await (worker as any).system
  system.on('loaded', () => {
    console.log(worker.sceneManifest.id, 'loaded')
    loaded.resolve(true)
  })
  return loaded
}

export async function watchForSceneDispose(sceneId: string, worker: ISceneWorker) {
  const stop = future<void>()
  worker.onDisposeObservable.addOnce((eventType: any, eventState: any) => {
    console.log(eventState, eventType)
    stop.resolve()
  })
  await stop
  return sceneId
}
