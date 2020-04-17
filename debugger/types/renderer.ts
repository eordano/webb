import { Store } from 'redux'

export type RendererState = {
  incoming: any[]
  outgoing: any[]
}

export const INCOMING_MESSAGE = 'Incoming Message'
export const OUTGOING_MESSAGE = 'Outgoing Message'
export type RendererAction = {
  type: typeof INCOMING_MESSAGE | typeof OUTGOING_MESSAGE
  payload: any
}

export type RendererStore = Store<RendererState>
