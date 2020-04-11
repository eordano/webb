import { AnyAction, createStore } from 'redux'

export const COMMS_REPORT = '[Comms] Report'
export type CommsReport = typeof COMMS_REPORT
export type CommsState = {}
export type ReportAction = { type: CommsReport; payload: CommsState }

export const INITAL_COMMS_STATE = {}
export function CommsReducer(state: CommsState, action: ReportAction | AnyAction) {
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
    case COMMS_REPORT:
      return action.payload
  }
  return state
}
export const commsStore: any = createStore(CommsReducer)

export function getCommsStore(): any {
  return commsStore
}
