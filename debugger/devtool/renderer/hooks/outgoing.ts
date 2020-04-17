import { tapFunction } from '../../jslibs/tapFunction'
import { clientLog } from '../../jslibs/clientLog'

export function setup() {
  tapFunction(
    'outgoing',
    (data: any) => {
      clientLog(`outgoing log` + JSON.stringify(data))
    },
    `function interceptMessages(unity) {
       const returns = { intercept: function () {}, deactivate: function () {} }
       const backups = {}
       for (let key in unity) {
         if (unity.hasOwnProperty(key)) {
           backups[key] = unity[key]
           unity[key] = function (...args) {
             returns.intercept(args)
             backups[key].apply(unity, args)
           }
         }
       }
       returns.deactivate = function () {
         for (let key in backups) {
           unity[key] = backups[key]
         }
       }
       return returns
     }
     function tryInject() {
      if (window.unityInterface) {
        window.intercept = interceptMessages(window.unityInterface)
        window.intercept.intercept = function() {
          window.postMessage(
            {
              name: 'dcl-explorer-outgoing',
              source: 'dcl-debugger',
              payload: arguments
            },
            '*'
          )
        }
      } else {
        setTimeout(tryInject, 1000)
      }
     }
     tryInject()
     `
  )
}
