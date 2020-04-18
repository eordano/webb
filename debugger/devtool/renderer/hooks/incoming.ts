import { tapFunction } from '../../jslibs/tapFunction'

declare var window: any

function tryInjectIn() {
  try {
    if (typeof window === undefined) {
      console.log('ℹ️ tried to inject into undefined window :/')
    }
    if (window.browserInterface && !window.__browserSendMessage) {
      console.log('ℹ️ browser interface intervened')
      var browserBackup = window.browserInterface
      var backup = window.browserInterface.onMessage
      Object.defineProperty(window, 'browserInterface', {
        get: () => browserBackup,
        set: (newBrowser) => {
          console.log('ℹ️ browser interface reinsert')
          browserBackup = newBrowser
          backup = newBrowser.onMessage
          newBrowser.onMessage = tapOnMessage
        },
      })
      function tapOnMessage(a, b, c, d) {
        window.postMessage({
          name: 'dcl-explorer-incoming',
          source: 'dcl-debugger',
          payload: {
            name: a,
            key: b,
          },
        })
        backup.apply(backup, [a, b, c, d])
      }
    } else if (window.browserInterface) {
      console.log('ℹ️ browser interface inject called twice')
    } else {
      console.log('ℹ️ browser interface not found yet')
      setTimeout(tryInjectIn, 1000)
    }
  } catch (e) {
    console.log('🥂', e)
  }
}

export function setup(connection: any, tap: Function) {
  tapFunction(connection, 'incoming', tap, `${tryInjectIn.toString()};tryInjectIn()`)
}
