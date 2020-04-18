import { clientLog } from '../jslibs/clientLog'
import { store } from './store'
import { GlobalChrome } from '../../types/chrome'
import { setInspectedTab } from '../explorer/actions/actionCreators'

export declare const chrome: GlobalChrome

function sendSceneInfo(object: any, path: string) {
  const parts = path.split('.').filter((_) => _ !== '')
  if (!parts.length) {
    const ret = {
      path: path,
      hasKeys: true,
      keys: Array.from(object.keys()),
      values: Array.from(object.keys()).reduce((prev, next: string) => {
        prev[next] = { hasKeys: false }
        return prev
      }, {}),
    }
    return ret
  }
  const obj = object.get(parts[0])
  const end = parts.slice(1).reduce((prev, next) => prev[next], obj)
  const canExpand = end !== undefined && end !== null && typeof end === 'object'
  return {
    path: path,
    hasKeys: true,
    keys: canExpand ? Object.keys(end) : [],
    values: canExpand
      ? Object.keys(end).reduce((prev, next) => {
          prev[next] =
            typeof end[next] === 'object'
              ? { hasKeys: false }
              : typeof end[next] === 'function'
              ? 'function'
              : typeof end[next] === 'undefined'
              ? 'undefined'
              : end[next] === null
              ? 'null'
              : end[next]
          return prev
        }, {})
      : typeof end === 'function'
      ? 'function'
      : typeof end === 'undefined'
      ? 'undefined'
      : end === null
      ? 'null'
      : end,
  }
}

export function setup(connection: any, tabId: number) {
  chrome.devtools.inspectedWindow.eval(`window.__sendSceneInfo = ${sendSceneInfo.toString()}`)
  connection.onMessage.addListener((event: any) => {
    try {
      if (typeof event === 'object' && event.name === 'dcl-explorer-scenes') {
        const data = event.payload
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
  store.dispatch(setInspectedTab(tabId))
}
