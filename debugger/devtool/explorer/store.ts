import { applyMiddleware, compose, createStore, Store } from 'redux'
import { loadAction } from './actionCreators'
import { OtherAction, StateAction } from './actions'
import { reducer } from './reducer'
import { shouldTriggerLoad } from './selectors/shouldTriggerLoad'
import { InspectedExplorableTree, ExplorerState } from './types'
import { clientLog } from '../jslibs/clientLog'
import { GlobalChrome } from '../../types/chrome'

declare var chrome: GlobalChrome
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
      chrome.tabs.executeScript((api.getState() as InspectedExplorableTree).inspectedTab, {
        code: `console.log(window, window.globalStore, __sendStoreInfo); window.postMessage({ name: 'dcl-explorer-store',
          source: 'dcl-debugger',
          payload: __sendStoreInfo(window.globalStore.getState(), "${action.payload}")
        }, '*')`,
      })
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

export const store: Store<ExplorerState> = createStore(reducer, enhancer)

export function setupConnectorToStore(connection: any, tabId: number) {
  chrome.tabs.executeScript(tabId, {
    code: `window.__sendStoreInfo = function (object, path) {
        const parts = path.split('.').filter((_) => _ !== '')
        const end = parts.reduce((prev, next) => prev[next], object)
        return {
          hasKeys: true,
          keys: typeof end === 'object' ? Object.keys(end) : [],
          values:
            typeof end === 'object'
              ? Object.keys(end).reduce((prev, next) => {
                  prev[next] = typeof end[next] === 'object' ? { hasKeys: false } : end[next]
                  return prev
                }, {})
              : end,
          }
        }`,
  })
  connection.onMessage.addListener((event: any) => {
    try {
      if (typeof event === 'object' && event.name === 'dcl-explorer-state') {
        const data = JSON.parse(event.payload)
        if (typeof data !== 'object') {
          throw new Error()
        }
        store.dispatch({
          type: 'Resolve',
          payload: event.payload,
        })
      }
    } catch (e) {
      clientLog(`Could not parse message from client:`, event)
    }
  })
}
