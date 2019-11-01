import { EventEmitter } from 'events'
import { call, put, take } from 'redux-saga/effects'
import { commsSignatureRequest, commsSignatureSuccessAction, COMMS_SIGNATURE_SUCCESS } from '../../auth/actions'

export function responder(): any {
  const event = new EventEmitter()
  return {
    caller: function(message: string) {
      return new Promise<Uint8Array>(resolve => {
        event.emit('query', message)
        event.once('response', (result: commsSignatureSuccessAction) => {
          resolve(result.payload)
        })
      })
    },
    looper: function*() {
      async function awaitSignatureRequest() {
        return new Promise<string>(resolve => {
          event.once('query', (a, b) => {
            resolve(a)
          })
        })
      }
      while (true) {
        const query = yield call(awaitSignatureRequest)
        yield put(commsSignatureRequest(query))
        const result = yield take(COMMS_SIGNATURE_SUCCESS)
        event.emit('response', result)
      }
    }
  }
}
