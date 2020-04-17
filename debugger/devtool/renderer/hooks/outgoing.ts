import { tapFunction } from '../../jslibs/tapFunction'
import { clientLog } from '../../jslibs/clientLog'

export function setup() {
  tapFunction(
    'outgoing',
    (data: any) => {
      clientLog(`outgoing log` + JSON.stringify(data))
    },
    `function tryInject() {
       if (window.unityInterface && window.unityInterface.SendGenericMessage) {
         console.log("ℹ️ unity interface intervened");
         for (let triggerSend in window.unityInterface) {
           const backup = window.unityInterface[triggerSend]
           window.unityInterface[triggerSend] = function() {
             window.postMessage({
               name: 'dcl-explorer-outgoing',
               source: 'dcl-debugger',
               payload: arguments
             }, '*')
             backup.apply(window.unityInterface, arguments)
           }
         }
       } else if (window.unityInterface) {
         console.log("ℹ️ unity interface exists -- no SendMessage though");
         setTimeout(tryInject, 1000)
       } else {
         console.log("ℹ️ unity interface not found yet");
         setTimeout(tryInject, 1000)
       }
     }
     tryInject()
     `
  )
}
