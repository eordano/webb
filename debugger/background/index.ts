import type { GlobalChrome } from 'dcl/debugger/types/chrome'
type WebSocketLike = {
  onMessage: {
    addListener: (handler: unknown) => EventListener
    removeListener: (listener: unknown) => void
  }
  onDisconnect: {
    addListener: (handler: unknown) => EventListener
    removeListener: (listener: unknown) => void
  }
}

declare var chrome: GlobalChrome

// Background page -- background.js
chrome.runtime.onConnect.addListener(function (devToolsConnection: WebSocketLike) {
  // assign the listener function to a variable so we can remove it later
  var devToolsListener = function (
    message: { tabId: number; scriptToInject: string },
    sender: number,
    sendResponse: unknown
  ) {
    // Inject a content script into the identified tab
    chrome.tabs.executeScript(message.tabId, { file: message.scriptToInject })
  }
  // add the listener
  devToolsConnection.onMessage.addListener(devToolsListener)

  devToolsConnection.onDisconnect.addListener(function () {
    devToolsConnection.onMessage.removeListener(devToolsListener)
  })
})
