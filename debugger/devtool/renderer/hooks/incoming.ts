import { tapFunction } from '../../jslibs/tapFunction'
import { clientLog } from '../../jslibs/clientLog'

export function setup() {
  tapFunction(
    'incoming',
    (data: any) => {
      clientLog(`incoming log` + JSON.stringify(data))
    },
    `
      function tryInject() {
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
