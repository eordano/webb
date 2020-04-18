import {
  CommsState,
  COMMS_DISCONNECTED,
  COMMS_REPORT,
  COMMS_SET_PREFERENCES,
  DisconnectedAction,
  INITAL_COMMS_STATE,
  ReportAction,
  SetPreferencesAction,
} from '../../types/comms'

export function CommsReducer(
  state: CommsState,
  action: ReportAction | DisconnectedAction | SetPreferencesAction
): CommsState {
  if (!action) {
    if (!state) {
      return INITAL_COMMS_STATE
    }
    return state
  }
  if (!state) {
    return CommsReducer(INITAL_COMMS_STATE, action)
  }
  const { historyLength } = state.configuration
  switch (action.type) {
    case COMMS_DISCONNECTED:
      return {
        ...state,
        history: [],
      }
    case COMMS_REPORT:
      return {
        ...state,
        history: [...(state.history || []).slice(0 - historyLength), action.payload],
      }
    case COMMS_SET_PREFERENCES:
      return {
        ...state,
        configuration: {
          ...state.configuration,
          ...action.payload,
        },
      }
  }
  return state
}
