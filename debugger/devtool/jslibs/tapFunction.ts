import { GlobalChrome } from 'dcl/debugger/types/chrome'
import { clientLog } from './clientLog'
declare var chrome: GlobalChrome

let done: Record<string, boolean> = {}
export function tapFunction(connection: any, messageName: string, hook: Function, inject?: string) {
  if (done[messageName]) {
    return
  }
  done[messageName] = true
  if (inject) {
    chrome.devtools.inspectedWindow.eval(inject)
  }
  connection.onMessage.addListener((event: any) => {
    try {
      if (typeof event === 'object' && event.name === 'dcl-explorer-' + messageName) {
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
}
