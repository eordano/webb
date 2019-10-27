import { call, fork, put } from 'redux-saga/effects'
import { signalRendererInitialized } from './actions'

export function* rendererSaga(): any {
  yield fork(awaitRendererInitialSignal)
}

export function* awaitRendererInitialSignal(): any {
  var global: any = typeof window !== undefined ? window : global
  yield call(waitForRenderer)
  if (global.unityInterface) {
    yield put(signalRendererInitialized(global.unityInterface))
  }
}

export async function waitForRenderer() {
  var global: any = typeof window !== undefined ? window : global
  return new Promise(resolve => {
    const interval = setInterval(() => {
      if (global.unityInterface && global.unityInterface.SendMessage) {
        clearInterval(interval)
        resolve()
      }
    }, 1000)
  })
}
