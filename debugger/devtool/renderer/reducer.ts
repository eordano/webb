import { RendererState, RendererAction, OUTGOING_MESSAGE, INCOMING_MESSAGE } from '../../types/renderer'
import { AnyAction } from 'redux'

const INITIAL_RENDERER_STATE = {
  incoming: [] as any[],
  outgoing: [] as any[],
}
export function Reducer(state: RendererState, action: RendererAction | AnyAction) {
  if (!state) {
    if (!action) {
      return INITIAL_RENDERER_STATE
    }
    return Reducer(INITIAL_RENDERER_STATE, action)
  }
  switch (action.type) {
    case INCOMING_MESSAGE:
      return { ...state, incoming: [action.payload, ...state.incoming.slice(0, 9)] }
    case OUTGOING_MESSAGE:
      return { ...state, outgoing: [action.payload, ...state.outgoing.slice(0, 9)] }
    default:
      return state
  }
}
