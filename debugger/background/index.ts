import type { GlobalChrome, DevToolConnection, WebSocketLike } from 'dcl/debugger/types/chrome'

declare var chrome: GlobalChrome

const connections: {
  [port: number]: DevToolConnection
} = {}

// Background page -- background.js
chrome.runtime.onConnect.addListener(function (port: WebSocketLike) {
  var devToolsListener = function (
    message: { name: string; tabId: number; scriptToInject: string },
    sender: number,
    sendResponse: Function
  ) {
    if (message.name === 'init') {
      connections[message.tabId] = port
    }
    if (message.name === 'inject') {
      // Inject a content script into the identified tab
      chrome.tabs.executeScript(message.tabId, { file: message.scriptToInject })
    }
    if (message.name === 'dcl-debugger-page') {
      // ?
      console.log(`Connected debugger ${JSON.stringify(message)}`)
    }
  }

  port.onMessage.addListener(devToolsListener)

  port.onDisconnect.addListener(function (devToolDisconnected: WebSocketLike) {
    port.onMessage.removeListener(devToolsListener)
    const allTabs = Object.keys(connections)
    for (let i = 0; i < allTabs.length; i++) {
      if (connections[i] === devToolDisconnected) {
        delete connections[i]
        break
      }
    }
  })
})

chrome.runtime.onMessage.addListener(function (
  request: string | object,
  sender: { tab?: { id?: number } },
  sendResponse: Function
) {
  // Messages from content scripts should have sender.tab set
  if (sender.tab) {
    var tabId = sender.tab.id
    if (tabId in connections) {
      connections[tabId].postMessage(request)
    } else {
      console.log('Tab not found in connection list.')
    }
  } else {
    console.log('sender.tab not defined.')
  }
  return true
})
