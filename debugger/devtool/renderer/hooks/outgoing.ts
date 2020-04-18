import { tapFunction } from '../../jslibs/tapFunction'

declare var window: any

function tryInjectOut() {
  try {
    if (typeof window === undefined) {
      console.log('ℹ️ unity tried to inject into undefined window :/')
    }
    if (window.unityInterface && window.unityInterface.SendGenericMessage) {
      console.log('ℹ️ unity interface intervened')
      for (let triggerSend in window.unityInterface) {
        if (window.unityInterface.hasOwnProperty(triggerSend) && triggerSend !== 'debug') {
          const backup = window.unityInterface[triggerSend]
          window.unityInterface[triggerSend] = function (a) {
            console.log('ℹ️ unity interface outgoing', a)
            try {
              backup.apply(window.unityInterface, arguments)
              window.postMessage(
                {
                  name: 'dcl-explorer-outgoing',
                  source: 'dcl-debugger',
                  payload: {
                    name: triggerSend,
                    value: a,
                  },
                },
                '*'
              )
            } catch (e) {
              console.log('🥂', e.stack)
            }
          }
        }
      }
    } else if (window.unityInterface) {
      console.log('ℹ️ unity interface exists -- no SendMessage though')
      setTimeout(tryInjectOut, 1000)
    } else {
      console.log('ℹ️ unity interface not found yet')
      setTimeout(tryInjectOut, 1000)
    }
  } catch (e) {
    console.log('ℹ️ unity intercept problem:', e)
  }
}
export function setup(connection: any, tap: Function) {
  tapFunction(connection, 'outgoing', tap, `${tryInjectOut.toString()};tryInjectOut();`)
}
