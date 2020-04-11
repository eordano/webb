import {
  CommsState,
  COMMS_REPORT,
  COMMS_DISCONNECTED,
  ReportAction,
  INITAL_COMMS_STATE,
  DisconnectedAction,
} from './types'

export function CommsReducer(state: CommsState, action: ReportAction | DisconnectedAction) {
  if (!action) {
    if (!state) {
      return INITAL_COMMS_STATE
    }
    return state
  }
  if (!state) {
    return CommsReducer(INITAL_COMMS_STATE, action)
  }
  switch (action.type) {
    case COMMS_DISCONNECTED:
      return {}
    case COMMS_REPORT:
      return {
        ...action.payload,
        history: [action.payload, ...(state.history || [])].filter((_, index) => index < 10),
      }
  }
  return state
}
