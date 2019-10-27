import { CommsAction, COMMS_DATACHANNEL_RELIABLE, COMMS_DATACHANNEL_UNRELIABLE, COMMS_SUCCESSFULLY_STARTED, COMMS_WEBRTC_ICE_STATE, COMMS_WELCOME, COMMS_WEBRTC_ICE_CANDIDATE, COMMS_WEBRTC_ICE_OFFER, PROTOCOL_UNSUBSCRIBE, PROTOCOL_SUBSCRIPTION } from './actions'

export type RootCommsState = {
  comms: CommsState
}

export const INITIAL_COMMS_STATE = {
  connected: false,
  status: 'disconnected',
  alias: 0,
  ice: {
    offers: [],
    candidates: []
  },
  reliable: false,
  unreliable: false,
}

export type CommsState = ConnectingState | ConnectedState

export type ConnectingState = {
  connected: boolean
  alias?: number
  ice: {
    offers: any[],
    candidates: any[]
  } | null
  status: string
  reliable: boolean
  unreliable: boolean
}

export type TopicData = {
  id: string
  sent: number
  received: number
  // Nice to have would be a `lastActivity` field -- consider adding timestamp to all actions
}

export type ConnectedState = {
  connected: boolean
  alias: number
  topics: Record<string, TopicData>
}

export function commsReducer(state: CommsState = INITIAL_COMMS_STATE, action?: CommsAction): CommsState {
  if (!state) {
    return INITIAL_COMMS_STATE
  }
  if (!action) {
    return state
  }
  if (!action.type.startsWith('[Comms]')) {
    return state
  }
  if (!state.connected) {
    return connectingReducer(state as ConnectingState, action)
  } else {
    return connectedReducer(state as ConnectedState, action)
  }
}

export const INITIAL_CONNECTED_STATE = { connected: true, topics: {} }

export function connectingReducer(state: ConnectingState, action: CommsAction): CommsState {
  switch (action.type) {
    case COMMS_WELCOME:
      return { ...INITIAL_COMMS_STATE, status: 'server sent welcome' }
    case COMMS_WEBRTC_ICE_STATE:
      if (action.payload.iceState === 'connected') {
        return { ...state, status: 'connecting' }
      }
      return { ...state, status: `ice status update: ${action.payload.iceState} (signaling: ${action.payload.signalingState})` }
    case COMMS_WEBRTC_ICE_CANDIDATE:
      return { ...state, ice: { ...state.ice, candidates: [...state.ice.candidates, action.payload] } }
    case COMMS_WEBRTC_ICE_OFFER:
      return { ...state, ice: { ...state.ice, offers: [...state.ice.offers, action.payload]} }
    case COMMS_DATACHANNEL_RELIABLE:
      return { ...state, reliable: true }
    case COMMS_DATACHANNEL_UNRELIABLE:
      return { ...state, unreliable: true }
    case COMMS_SUCCESSFULLY_STARTED:
      return { ...INITIAL_CONNECTED_STATE, alias: state.alias! }
  }
  return state
}

export function connectedReducer(state: ConnectedState, action: CommsAction): CommsState {
  switch (action.type) {
    case PROTOCOL_UNSUBSCRIBE:
    case PROTOCOL_SUBSCRIPTION:
      const id = action.payload.topic
      const topics = { ...state.topics }
      if (action.type === PROTOCOL_SUBSCRIPTION) {
        topics[id] = { id, sent: 0, received: 0 }
      } else {
        delete topics[id]
      }
      return { ...state, topics }
  }
  return state
}