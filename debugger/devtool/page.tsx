import type { GlobalChrome } from 'dcl/debugger/types/chrome'
import React, { useCallback } from 'react'
import ReactDOM from 'react-dom'
import { setupComms } from './comms/setup'
import { commsStore } from './comms/store'
import { useStore2 } from './jslibs/useStore2'
import { clientLog } from './jslibs/clientLog'
declare const chrome: GlobalChrome

/**
 * Initialize the connection
 */
export const backgroundPageConnection = chrome.runtime.connect({
  name: 'dcl-debugger-page',
})
/**
 * Send the first message to the background page
 */
backgroundPageConnection.postMessage({
  name: 'init',
  tabId: chrome.devtools.inspectedWindow.tabId,
})

setupComms(backgroundPageConnection)

/**
 * Create a panel and continue there
 */
chrome.devtools.panels.create('DCL Tools', 'static/icon.png', 'static/panel.html', function (panel) {
  panel.onShown.addListener(function (panelWin: Window) {
    ReactDOM.render(<Render />, panelWin.document.getElementById('root'))
    backgroundPageConnection.onMessage.addListener(function (message: any) {
      clientLog(`[dcl-debugger:panel] received message`, message)
    })
  })
})

function Render() {
  const test = useCallback(() => {
    chrome.devtools.inspectedWindow.eval(
      `window.postMessage(
         {
           name: '[dcl-debugger:panel] Pong!',
           source: 'dcl-debugger',
         },
         '*'
       )`
    )
  }, [])
  const [state] = useStore2(commsStore)
  return (
    <div>
      <div style={{ color: 'white' }}>Render 5</div>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <button onClick={test}>Send Test `Ping`</button>
    </div>
  )
}
