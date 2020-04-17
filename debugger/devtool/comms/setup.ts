import { clientLog } from '../jslibs/clientLog'
import type { DevToolConnection, GlobalChrome } from '../../types/chrome'
import { store } from './store'
import { COMMS_REPORT, COMMS_DISCONNECTED } from '../../types/comms'
export declare var chrome: GlobalChrome

export function setupComms(connection: DevToolConnection) {
  chrome.devtools.inspectedWindow.eval(
    `window.setInterval(() => {
       (typeof window !== 'undefined')
       && (window.__DEBUG_PEER !== undefined)
       && (window.__DEBUG_PEER.stats !== undefined)
       && window.postMessage(
         {
           source: 'dcl-debugger',
           type: 'comms',
           payload: JSON.stringify(window.__DEBUG_PEER.stats)
         },
         '*'
       )
     }, 5000)`
  )
  connection.onMessage.addListener((event: any) => {
    try {
      if (typeof event === 'object' && event.type === 'comms') {
        const data = JSON.parse(event.payload)
        if (typeof data !== 'object') {
          throw new Error()
        }
        store.dispatch({
          type: COMMS_REPORT,
          payload: data,
        })
      }
    } catch (e) {
      clientLog(`Could not parse message from client:`, event)
    }
  })
}

export function resetComms() {
  store.dispatch({ type: COMMS_DISCONNECTED })
}
