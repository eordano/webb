import { DEBUG_REDUX } from '@dcl/config'
import { applyMiddleware, compose, createStore, Store } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { tryRestoreSession } from '../auth/sagas'
import { setProfileServer } from '../passports/actions'
import { configureLineOfSightRadius } from '../scene-atlas/02-parcel-sight/actions'
import { createReducer, RootState } from './reducers'
import { rootSaga } from './rootSaga'

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
  store.dispatch(configureLineOfSightRadius(4))
  store.dispatch(setProfileServer('https://avatars-api.decentraland.org/'))
  sagasMiddleware.run(rootSaga)
  return { store, sagasMiddleware }
}

export const initialActions = (store: any, sagasMiddleware: any) => {
  sagasMiddleware.run(tryRestoreSession)
}
