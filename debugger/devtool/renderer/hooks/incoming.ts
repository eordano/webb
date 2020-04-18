import { tapFunction } from '../../jslibs/tapFunction'

export function setup(tap: Function) {
  tapFunction(
    'incoming',
    tap,
    `
      function tryInject() {
        if (typeof window === undefined) {
          console.log("ℹ️ tried to inject into undefined window :/");
        }
        if (window.browserInterface && !window.__browserSendMessage) {
          console.log("ℹ️ browser interface intervened");
          window.__browserSendMessage = window.browserInterface.SendMessage;
          window.browserInterface.SendMessage = function() {
            try {
              window.postMessage({
                name: 'dcl-explorer-incoming',
                source: 'dcl-debugger',
                payload: arguments
              })
            } catch (e) {
              console.log(e)
            }
            window.__browserSendMessage.apply(window.browserInterface, arguments)
          }
        } else if (window.browserInterface) {
          console.log("ℹ️ browser interface inject called twice");
        } else {
          console.log("ℹ️ browser interface not found yet");
          setTimeout(tryInject, 1000)
        }
     }
     tryInject()
    `
  )
}
