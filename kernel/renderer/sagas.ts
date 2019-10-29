import { call, put } from 'redux-saga/effects'
import { signalRendererInitialized } from './actions'

export function* rendererSaga(): any {
  // yield fork(awaitRendererInitialSignal)
}

export function* awaitRendererInitialSignal(): any {
  var scope: any = typeof window !== undefined ? window : global
  yield call(waitForRenderer)
  if (scope.unityInterface) {
    yield put(signalRendererInitialized(scope.unityInterface))
  }
}

export async function waitForRenderer() {
  var scope: any = typeof window !== undefined ? window : global
  return new Promise(resolve => {
    const interval = setInterval(() => {
      if (scope.unityInterface && scope.unityInterface.SendMessage) {
        clearInterval(interval)
        resolve()
      }
    }, 1000)
  })
}
