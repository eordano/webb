import { applyMiddleware, compose, createStore as reduxCreateStore, Store } from 'redux'
import { GlobalChrome } from '../../types/chrome'
import { ExplorerState } from '../../types/explorer'
import { loadAction } from './actions/actionCreators'
import { OtherAction, StateAction } from './actions/actions'
import { reducer } from './reducers/reducer'
import { shouldTriggerLoad } from './selectors/shouldTriggerLoad'

export declare var chrome: GlobalChrome
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
  if (action.type === 'Set Inspected Tab') {
  }
  if (action.type === 'Loading') {
    const tabId = api.getState().inspectedTab
    if (tabId) {
      chrome.devtools.inspectedWindow.eval(
        `window.postMessage({ name: 'dcl-explorer-state',
          source: 'dcl-debugger',
          payload: window.__sendStoreInfo(window.globalStore.getState(), "${action.payload}")
        }, '*')`
      )
    }
  }
  return next(action)
}
declare var window: any
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

const enhancer = composeEnhancers(applyMiddleware(middleWare))

export const store: Store<ExplorerState> = reduxCreateStore(reducer, enhancer)

export function createStore(): Store<ExplorerState> {
  return store
}
