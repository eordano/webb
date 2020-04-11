import { createStore } from 'redux'
import { CommsReducer } from './reducer'

export const commsStore: any = createStore(CommsReducer)

export function getCommsStore(): any {
  return commsStore
}
