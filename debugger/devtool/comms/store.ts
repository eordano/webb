import { createStore as createReduxStore, Store } from 'redux'
import { CommsReducer } from './reducer'
import { CommsState } from '../../types/comms'

export const store: Store<CommsState> = createReduxStore(CommsReducer)

export const createStore: () => Store<CommsState> = () => store
