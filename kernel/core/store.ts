import { DEBUG_REDUX, getServerConfigurations } from 'dcl/config'
import { applyMiddleware, compose, createStore, Store, Reducer } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { setProfileServer } from '../passports/actions'
import { configureLineOfSightRadius } from '../scene-atlas/02-parcel-sight/actions'
import { configureDownloadServer } from '../scene-atlas/04-sceneId-resolution/actions'
import { configureManifestDownloadServer } from '../scene-atlas/05-sceneManifest-resolution/types'
import { createReducer } from './reducers'
import { rootSaga } from './rootSaga'
import { RootState } from './types'
import { restoreSession } from '../auth/actions'
import { commsStarted } from '../comms/actions'
import { isLoggedIn } from '../auth/selectors'
import { isConnected } from '../comms/selectors'

declare var window: any
export let store: Store<RootState>

export async function waitFor<T>(store: Store<RootState>, isFulfilled: (state: RootState) => boolean): Promise<T> {
  return new Promise((resolve) => {
    const unsubscribe = store.subscribe(() => {
      if (isFulfilled(store.getState())) {
        unsubscribe()
        return resolve()
      }
    })
  })
}

export function triggerLoginAndAwait(store: Store<RootState>) {
  store.dispatch(restoreSession())
  return waitFor(store, state => isLoggedIn(state))
}

export function triggerConnectAndAwait(store: Store<RootState>) {
  store.dispatch(commsStarted())
  return waitFor(store, state => isConnected(state))
}

export const configureStore: (otherReducers?: Record<string, Reducer>, state?: any) => { store: Store<RootState>; sagasMiddleware: any; start: () => void } = (otherReducers: Record<string, Reducer>, state?: any) => {
  const enhance =
    typeof window === 'object' && (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && DEBUG_REDUX)
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          name: 'webb'
        })
      : compose
  const sagasMiddleware = createSagaMiddleware()
  store = createStore(createReducer(otherReducers), state, enhance(applyMiddleware(sagasMiddleware))) as Store<RootState>
  const config = getServerConfigurations()
  store.dispatch(configureLineOfSightRadius(4))
  store.dispatch(configureDownloadServer(config.content))
  store.dispatch(configureManifestDownloadServer(config.content))
  store.dispatch(setProfileServer(config.avatar.server))

  async function start() {
    sagasMiddleware.run(rootSaga)
    await triggerLoginAndAwait(store)
    await triggerConnectAndAwait(store)
  }
  return { store, sagasMiddleware, start }
}
