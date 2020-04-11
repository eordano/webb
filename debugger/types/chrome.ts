
export type GlobalChrome = {
  devtools: {
    panels: {
      create: (name: string, icon: string, page: string, code: Function) => void
    }
  }
  runtime: {
    onConnect: {
      addListener: (handler: unknown) => EventListener
    }
  }
  tabs: {
    executeScript: (tab: number, data: unknown) => void
  }
}