import { tapFunction } from '../../jslibs/tapFunction'

export function setup(connection: any, tap: Function) {
  tapFunction(
    connection,
    'incoming',
    tap,
    `
      function tryInject() {
        if (typeof window === undefined) {
          console.log("ℹ️ tried to inject into undefined window :/");
        }
        if (window.browserInterface && !window.__browserSendMessage) {
          console.log("ℹ️ browser interface intervened");
          const backup = window.browserInterface.OnMessage;
          window.browserInterface.OnMessage = function(a, b, c, d) {
            console.log("ℹ️ ---", a, b)
            try {
              window.postMessage({
                name: 'dcl-explorer-incoming',
                source: 'dcl-debugger',
                 payload: {
                   name: a
                   key: b
                 }
              })
            } catch (e) {
              console.log(e)
            }
            backup.apply(window.browserInterface, [a, b, c, d])
          }
        } else if (window.browserInterface) {
          console.log("ℹ️ browser interface inject called twice");
        } else {
          console.log("ℹ️ browser interface not found yet");
          setTimeout(tryInject, 1000)
        }
     }
     console.log('🥂')
     tryInject()
    `
  )
}
