import { applyMiddleware, compose, createStore, Store } from 'redux'
import { loadAction } from './actionCreators'
import { OtherAction, StateAction } from './actions'
import { reducer } from './reducer'
import { shouldTriggerLoad } from './selectors/shouldTriggerLoad'
import { ExplorerState } from './types'

const middleWare = (api: any) => (next: any) => (action?: StateAction | OtherAction) => {
  if (!action) {
    return next(action)
  }
  if (action.type === 'Expand') {
    const result = next(action)
    if (shouldTriggerLoad(api.getState(), action.payload)) {
      api.dispatch(loadAction(action.payload))
    }
    return result
  }
  if (action.type === 'Loading') {
    // TODO: Query main window
    // Something like: api.dispatch(getResolveActionWithSnapshot(action.payload))
  }
  return next(action)
}

declare var window: any
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

const enhancer = composeEnhancers(
  applyMiddleware(middleWare)
)

export const store: Store<ExplorerState> = createStore(reducer, enhancer)
