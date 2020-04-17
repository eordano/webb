import { clientLog } from '../jslibs/clientLog'
import { chrome, store } from './store'

export function setup(connection: any, tabId: number) {
  chrome.devtools.inspectedWindow.eval(`window.__sendStoreInfo = function (object, path) {
       const parts = path.split('.').filter((_) => _ !== '')
       const end = parts.reduce((prev, next) => prev[next], object)
       return {
         path: path,
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
     }`)
  connection.onMessage.addListener((event: any) => {
    try {
      if (typeof event === 'object' && event.name === 'dcl-explorer-state') {
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
}
