import { DEBUG_REDUX } from '@dcl/config'
import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createReducer } from './reducers'
import { setProfileServer } from '../passports/actions'
import { rootSaga } from './rootSaga'
import { configureLineOfSightRadius } from '../scene-atlas/02-parcel-sight/actions'
import { tryRestoreSession } from '../auth/sagas'

declare var window: any
const enhance =
  typeof window === 'object' && (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && DEBUG_REDUX)
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        name: 'webb'
      })
    : compose

export var store

export const configureStore: any = (state: any) => {
  const sagasMiddleware = createSagaMiddleware()
  store = createStore(createReducer(), state, enhance(applyMiddleware(sagasMiddleware)))
  store.dispatch(configureLineOfSightRadius(4))
  store.dispatch(setProfileServer('https://avatars-api.decentraland.org/'))
  sagasMiddleware.run(rootSaga)
  return { store, sagasMiddleware }
}

export const initialActions = (store: any, sagasMiddleware: any) => {
  sagasMiddleware.run(tryRestoreSession)
}
