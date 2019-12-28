import { DEBUG_REDUX, getServerConfigurations } from 'dcl/config'
import { applyMiddleware, compose, createStore, Store, Reducer } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { setProfileServer } from '../passports/actions'
import { configureLineOfSightRadius } from '../scene-atlas/02-parcel-sight/actions'
import { configureDownloadServer } from '../scene-atlas/04-sceneId-resolution/actions'
import { createReducer } from './reducers'
import { rootSaga } from './rootSaga'
import { RootState } from './types'

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

  async function start() {
    sagasMiddleware.run(rootSaga)
    store.dispatch(configureLineOfSightRadius(4))
    store.dispatch(configureDownloadServer(config.content))
    store.dispatch(setProfileServer(config.profile))
  }
  return { store, sagasMiddleware, start }
}
