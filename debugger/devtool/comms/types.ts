export const COMMS_REPORT = '[Comms] Report'
export const COMMS_DISCONNECTED = '[Comms] Disconnected'

export type CommsReport = typeof COMMS_REPORT
export type CommsDisconnected = typeof COMMS_DISCONNECTED

export type CommsState = {
  history?: any[]
}

export const INITAL_COMMS_STATE: CommsState = {}

export type ReportAction = {
  type: CommsReport
  payload: CommsState
}

export type DisconnectedAction = {
  type: CommsDisconnected
}
