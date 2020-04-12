import { applyMiddleware, compose, createStore } from 'redux'
import { getResolveActionWithSnapshot, loadAction } from './actionCreators'
import { OtherAction, StateAction } from './actions'
import { reducer } from './reducer'
import { shouldTriggerLoad } from './selectors/shouldTriggerLoad'

const FAKE_NETWORK_TIME = 100
const fakeFetchMiddleware = (api: any) => (next: any) => (action?: StateAction | OtherAction) => {
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
    setTimeout(() => {
      api.dispatch(getResolveActionWithSnapshot(action.payload))
    }, FAKE_NETWORK_TIME)
  }
  return next(action)
}

declare var window: any
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose

const enhancer = composeEnhancers(
  applyMiddleware(fakeFetchMiddleware)
  // other store enhancers if any
)

export const store = createStore(reducer, enhancer)
