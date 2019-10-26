import { DEBUG_REDUX, getServerConfigurations } from 'dcl/config'
import { applyMiddleware, compose, createStore, Store } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { tryRestoreSession } from '../auth/sagas'
import { setProfileServer } from '../passports/actions'
import { configureLineOfSightRadius } from '../scene-atlas/02-parcel-sight/actions'
import { configureDownloadServer } from '../scene-atlas/04-sceneId-resolution/actions'
import { configureManifestDownloadServer } from '../scene-atlas/05-sceneManifest-resolution/types'
import { createReducer } from './reducers'
import { rootSaga } from './rootSaga'
import { RootState } from './types'

declare var window: any
const enhance =
  typeof window === 'object' && (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && DEBUG_REDUX)
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        name: 'webb'
      })
    : compose

export let store: Store<RootState>

export const configureStore: (state?: any) => { store: Store<RootState>; sagasMiddleware: any } = (state?: any) => {
  const sagasMiddleware = createSagaMiddleware()
  store = createStore(createReducer(), state, enhance(applyMiddleware(sagasMiddleware))) as Store<RootState>
  const config = getServerConfigurations()
  store.dispatch(configureLineOfSightRadius(4))
  store.dispatch(configureDownloadServer(config.content))
  store.dispatch(configureManifestDownloadServer(config.content))
  store.dispatch(setProfileServer(config.avatar.server))

  function start (sagasMiddleware: any) {
    sagasMiddleware.run(rootSaga)
    sagasMiddleware.run(tryRestoreSession)
  }
  return { store, sagasMiddleware, start }
}
