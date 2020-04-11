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
    connect: (what: { name: string }) => WebSocketLike
    sendMessage: (what: unknown) => void
  }
  tabs: {
    executeScript: (tab: number, data: unknown) => void
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

declare const chrome: GlobalChrome

window.addEventListener('message', function (event) {
  const EXTENSION_NAMESPACE = 'dcl-debugger'

  // Only accept messages from the same frame
  if (event.source !== window) {
    return
  }
  var message = event.data
  // Only accept messages that we know are ours
  if (typeof message !== 'object' || message === null || message.source !== EXTENSION_NAMESPACE) {
    return
  }
  try {
    chrome.runtime.sendMessage(message)
  } catch (e) {
    console.log(`>> context probably invalidated! waiting re-insert`)
  }
})
