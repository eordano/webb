import { createStore, Store } from 'redux'
import { CommsReducer } from './reducer'
import { CommsState } from './types'

export const store: Store<CommsState> = createStore(CommsReducer)
