import { call, fork, put } from 'redux-saga/effects'
import { signalRendererInitialized } from './actions'

declare var global: any

export function* rendererSaga(): any {
  yield fork(awaitRendererInitialSignal)
}

export function* awaitRendererInitialSignal(): any {
  yield call(waitForRenderer)
  if (global.unityInterface) {
    yield put(signalRendererInitialized(global.unityInterface))
  }
}

export async function waitForRenderer() {
  return new Promise(resolve => {
    const interval = setInterval(() => {
      if (global.unityInterface && global.unityInterface.SendMessage) {
        clearInterval(interval)
        resolve()
      }
    }, 1000)
  })
}
