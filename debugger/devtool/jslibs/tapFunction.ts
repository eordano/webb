import { GlobalChrome } from 'dcl/debugger/types/chrome'
import { clientLog } from './clientLog'
declare var chrome: GlobalChrome

export function tapFunction(messageName: string, hook: Function, inject?: string) {
  if (inject) {
    chrome.devtools.inspectedWindow.eval(inject)
  }
  chrome.devtools.inspectedWindow.addEventListener('dcl-explorer-' + messageName, (event: any) => {
    try {
      if (typeof event === 'object') {
        const data = event.payload
        if (typeof data !== 'object') {
          throw new Error()
        }
        hook(event.payload)
      }
    } catch (e) {
      clientLog(`Could not parse message from client:`, event)
    }
  })
  return (fun: string) => {
    chrome.devtools.inspectedWindow.eval(
      `window.postMessage({
        name: 'dcl-explorer-${messageName}',
        source: 'dcl-debugger',
        payload: ${fun}
      }, '*')`
    )
  }
}
