import { ConnectingState, RootCommsState, ConnectedState } from './reducer'

export function didBothChannelsConnect(state: RootCommsState) {
  return (
    state.comms.connected || ((state.comms as ConnectingState).reliable && (state.comms as ConnectingState).unreliable)
  )
}

export function isConnected(state: RootCommsState) {
  return state.comms.connected
}

export function isDisconnected(state: RootCommsState) {
  return !isConnected(state)
}

export function shouldAnnounceConnected(state: RootCommsState) {
  return didBothChannelsConnect(state) && isDisconnected(state)
}

export function getSubscriptions(state: RootCommsState): string[] {
  if (isDisconnected(state)) {
    return []
  }
  return Object.keys((state.comms as ConnectedState).topics)
}