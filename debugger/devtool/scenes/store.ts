import { applyMiddleware, compose, createStore as reduxCreateStore, Store } from 'redux'
import { GlobalChrome } from '../../types/chrome'
import { ScenesState } from '../../types/explorer'
import { loadAction } from '../explorer/actions/actionCreators'
import { OtherAction, StateAction } from '../explorer/actions/actions'
import { reducer } from '../explorer/reducers/reducer'
import { shouldTriggerLoad } from '../explorer/selectors/shouldTriggerLoad'

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
  if (action.type === 'Loading') {
    chrome.devtools.inspectedWindow.eval(
      `(function() {
        try {
          const r = window.__sendSceneInfo(window.sceneWorkers, "${action.payload}")
          window.postMessage({ name: 'dcl-explorer-scenes',
            source: 'dcl-debugger',
            payload: r
          }, '*')
        } catch(e) {
          debugger
          window.__sendSceneInfo(window.sceneWorkers, "${action.payload}")
          debugger
          alert('Error in \`dcl-debugger\`, please check the console');
          console.log(e.stack)
        }
      })()`
    )
  }
  return next(action)
}
declare var window: any
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

const enhancer = composeEnhancers(applyMiddleware(middleWare))

export const store: Store<ScenesState> = reduxCreateStore(reducer, enhancer)

export function createStore(): Store<ScenesState> {
  return store
}
