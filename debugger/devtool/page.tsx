import React from 'react'
import ReactDOM from 'react-dom'
import type { GlobalChrome } from '../types/chrome'
import { default as CommsPresenter } from './comms/presenter'
import { resetComms, setupComms } from './comms/setup'
import { createStore as createCommsStore } from './comms/store'
import { default as Explorer } from './explorer/present'
import { setup as setupExplorer } from './explorer/setup'
/**
 * Explorer module
 */
import { createStore as createExplorerStore } from './explorer/store'
import { clientLog } from './jslibs/clientLog'
import { Root } from './layout/Root'
import { mapSections } from './layout/Sections'
/**
 * Comms module
 */
import { setup as setupRenderer } from './renderer/setup'
/**
 * Renderer module
 */
import { createStore as createRenderStore } from './renderer/store'
import * as Renderer from './renderer/present'

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
  const commsStore = createCommsStore()
  /**
   * Also, kernel tap-into-store
   */
  setupExplorer(backgroundPageConnection, chrome.devtools.inspectedWindow.tabId)
  const explorerStore = createExplorerStore()
  /**
   * Tap for renderer messages
   */
  setupRenderer(backgroundPageConnection)
  const rendererStore = createRenderStore()

  mapSections.Status.component = Explorer
  mapSections.Networking.component = CommsPresenter
  mapSections.Outgoing.component = Renderer.Outgoing
  mapSections.Incoming.component = Renderer.Incoming

  /**
   * Create a panel and continue there
   */
  chrome.devtools.panels.create('DCL Tools', 'static/icon.png', 'static/panel.html', function (panel) {
    panel.onShown.addListener(function (panelWin: Window) {
      ReactDOM.render(
        <Root
          windowContext={panelWin}
          explorerStore={explorerStore}
          commsStore={commsStore}
          rendererStore={rendererStore}
        />,
        panelWin.document.getElementById('root')
      )
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
clientLog('initialized')
setupBackground()
