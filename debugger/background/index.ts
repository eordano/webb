type _GlobalChrome = {
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
    connect: (what: { name: string }) => _WebSocketLike
    sendMessage: (what: unknown) => void
  }
  tabs: {
    executeScript: (tab: number | string, data: unknown) => void
  }
}
declare var chrome: _GlobalChrome

type _WebSocketLike = {
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

type _DevToolConnection = _WebSocketLike

const connections: {
  [port: number]: _DevToolConnection
} = {}

// Background page -- background.js
chrome.runtime.onConnect.addListener(function (port: _WebSocketLike) {
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

  port.onDisconnect.addListener(function (devToolDisconnected: _WebSocketLike) {
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
