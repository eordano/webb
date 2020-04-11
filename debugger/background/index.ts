type GlobalChrome = {
  devtools: {
    panels: {
      create: (name: string, icon: string, page: string, code: Function) => void
    }
    inspectedWindow: Window & { tabId: number }
  }
  runtime: {
    onConnect: {
      addListener: (handler: unknown) => EventListener
    }
    onMessage: {
      addListener: (handler: unknown) => EventListener
    }
    onInstalled: {
      addListener: (handler: unknown) => EventListener
    }
    connect: (what: { name: string }) => WebSocketLike
    sendMessage: (what: unknown) => void
  }
  tabs: {
    executeScript: (tab: number | string, data: unknown) => void
  }
}

type WebSocketLike = {
  onMessage: {
    addListener: (handler: unknown) => EventListener
    removeListener: (listener: unknown) => void
  }
  onDisconnect: {
    addListener: (handler: unknown) => EventListener
    removeListener: (listener: unknown) => void
  }
  postMessage: Function
}

type DevToolConnection = WebSocketLike

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
    if (!message.tabId) {
      return
    }
    if (message.name === 'init') {
      connections[message.tabId] = port
      chrome.tabs.executeScript(message.tabId, { file: 'js/inject.js' })
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
      try {
        connections[tabId].postMessage(request)
      } catch (e) {
        delete connections[tabId]
        console.log(`disconnecting: ${tabId} could not be reached`, e.stack)
      }
    } else {
      console.log(`tab ${tabId} not found in connection list.`)
    }
  } else {
    console.log('sender.tab not defined.')
  }
  return true
})
