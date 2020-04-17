import { createStore as createReduxStore, Store } from 'redux'
import { RendererState } from '../../types/renderer'
import { Reducer } from './reducer'

const store = createReduxStore(Reducer)

export function createStore(): Store<RendererState> {
  return store
}
