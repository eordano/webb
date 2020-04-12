export type GlobalChrome = {
  devtools: {
    panels: {
      create: (name: string, icon: string, page: string, code: Function) => void
    }
    inspectedWindow: Window & { tabId: number; eval: Function }
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

export type WebSocketLike = {
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

export type DevToolConnection = WebSocketLike
