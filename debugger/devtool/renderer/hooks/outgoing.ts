import { tapFunction } from '../../jslibs/tapFunction'

export function setup(connection: any, tap: Function) {
  tapFunction(
    connection,
    'outgoing',
    tap,
    `function tryInject() {
       if (typeof window === undefined) {
         console.log("ℹ️ tried to inject into undefined window :/");
       }
       if (window.unityInterface && window.unityInterface.SendGenericMessage) {
         console.log("ℹ️ unity interface intervened");
         for (let triggerSend in window.unityInterface) {
           if (window.unityInterface.hasOwnProperty(triggerSend) && triggerSend !== 'debug') {
             const backup = window.unityInterface[triggerSend]
             window.unityInterface[triggerSend] = function(a, b, c, d, e) {
               if (b || c || d || e) {
                 console.log('ℹ️ unexpected extra argument')
               }
               backup.apply(window.unityInterface, arguments)
               try {
                 window.postMessage({
                   name: 'dcl-explorer-outgoing',
                   source: 'dcl-debugger',
                   payload: {
                     name: triggerSend,
                     value: a,
                     extra: [b, c, d, e]
                   }
                 }, '*')
               } catch (e) {
                 console.log("ℹ️ unity intercept problem:", triggerSend, e, arguments);
               }
             }
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
