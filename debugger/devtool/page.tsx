import React from 'react'
import ReactDOM from 'react-dom'
import type { GlobalChrome } from '../types/chrome'
import { Networking } from './comms/CommsPanel'
import { resetComms, setupComms } from './comms/setup'
import { setInspectedTab } from './explorer/actionCreators'
import { Status } from './explorer/Status'
import { setupConnectorToStore, store } from './explorer/store'
import { clientLog } from './jslibs/clientLog'
import { Root } from './layout/Root'
import { mapSections } from './layout/Sections'
import { tapOnOutgoingKernelMessages } from './renderer/outgoing'
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

  /**
   * Setup modules. First, comms networking info report
   */
  setupComms(backgroundPageConnection)
  /**
   * Also, kernel tap-into-store
   */
  tapOnOutgoingKernelMessages(chrome.devtools.inspectedWindow.tabId)
  setupConnectorToStore(backgroundPageConnection, chrome.devtools.inspectedWindow.tabId)
  store.dispatch(setInspectedTab(chrome.devtools.inspectedWindow.tabId))

  mapSections.Status.component = Status
  mapSections.Networking.component = Networking

  /**
   * Create a panel and continue there
   */
  chrome.devtools.panels.create('DCL Tools', 'static/icon.png', 'static/panel.html', function (panel) {
    panel.onShown.addListener(function (panelWin: Window) {
      ReactDOM.render(<Root windowContext={panelWin} />, panelWin.document.getElementById('root'))
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
