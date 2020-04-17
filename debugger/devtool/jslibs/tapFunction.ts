import { GlobalChrome } from 'dcl/debugger/types/chrome'
declare var chrome: GlobalChrome

let done: Record<string, boolean> = {}
export function tapFunction(messageName: string, hook: Function, inject?: string) {
  if (done[messageName]) {
    return
  }
  done[messageName] = true
  if (inject) {
    chrome.devtools.inspectedWindow.eval(inject)
  }
  chrome.devtools.inspectedWindow.eval(`
  window.addEventListener('dcl-explorer-${messageName}', (event: any) => {
    console.log(event, ${hook.toString()})
    try {
      if (typeof event === 'object') {
        const data = event.payload
        if (typeof data !== 'object') {
          throw new Error()
        }
        ${hook.toString}(event.payload)
      }
    } catch (e) {
      clientLog('Could not parse message from client:', event)
    }
  })`)
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
