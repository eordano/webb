import React from 'react'
import ReactDOM from 'react-dom'
import type { GlobalChrome } from '../types/chrome'
import { setupComms, resetComms } from './comms/setup'
import { clientLog } from './jslibs/clientLog'
import { Render } from './Render'
export declare const chrome: GlobalChrome

const FILE_LOCAL_VERBOSE_BUGS = false

function setupBackground() {
  /**
   * Initialize the connection
   */
  const backgroundPageConnection = chrome.runtime.connect({
    name: 'dcl-debugger-page',
  })
  /**
   * Send the first message to the background page
   */
  backgroundPageConnection.postMessage({
    name: 'init',
    tabId: chrome.devtools.inspectedWindow.tabId,
  })

  backgroundPageConnection.onDisconnect.addListener(() => {
    resetComms()
  })
  setupComms(backgroundPageConnection)

  /**
   * Create a panel and continue there
   */
  chrome.devtools.panels.create('DCL Tools', 'static/icon.png', 'static/panel.html', function (panel) {
    panel.onShown.addListener(function (panelWin: Window) {
      ReactDOM.render(<Render panelWindow={panelWin} />, panelWin.document.getElementById('root'))
      backgroundPageConnection.onDisconnect.addListener(function (message: any) {
        ReactDOM.render(<h2>Disconnected</h2>, panelWin.document.getElementById('root'))
      })
      backgroundPageConnection.onMessage.addListener(function (message: any) {
        if (typeof message === 'object' && message.name === '[dcl-debugger:panel] Pong!') {
          clientLog(`📬 Messaging back & forth between dcl-debugger and the client successfully established 👌`)
        }
        FILE_LOCAL_VERBOSE_BUGS && clientLog(`[dcl-debugger:panel] received message`, message)
      })
    })
  })
}

setupBackground()
