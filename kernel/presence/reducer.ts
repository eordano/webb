import { PresenceState } from './types'

export const INITIAL_PRESENCE_STATE = {
  lastTimestampReceivedByUserId: {},
  commsAliasToUserId: {},
  presenceByUserId: {}
}

export function presenceReducer(state?: PresenceState, action?: any): PresenceState {
  if (!state) {
    return INITIAL_PRESENCE_STATE
  }
  if (!action || !action.type || !(typeof action.type === 'string')) {
    return state
  }
  return state
}
