export const COMMS_REPORT = '[Comms] Report'
export const COMMS_DISCONNECTED = '[Comms] Disconnected'
export const COMMS_SET_PREFERENCES = '[Comms] Set preferences'

export type CommsReport = typeof COMMS_REPORT
export type CommsDisconnected = typeof COMMS_DISCONNECTED
export type CommsSetPreferences = typeof COMMS_SET_PREFERENCES

export type CommsState = {
  history: any[]
  configuration: {
    messageType: MessageTypeFilter
    statFilter: StatTypeFilter
    historyLength: number
  }
}

export const INITAL_COMMS_STATE: CommsState = {
  history: [],
  configuration: {
    messageType: 'all',
    statFilter: 'totalBytes',
    historyLength: 15,
  },
}

export type ReportAction = {
  type: CommsReport
  payload: CommsState
}

export type DisconnectedAction = {
  type: CommsDisconnected
}

export type SetPreferencesAction = {
  type: CommsSetPreferences
  payload: {
    messageType?: MessageTypeFilter
    statFilter?: StatTypeFilter
    historyLength?: number
  }
}

export const MessageTypeFilterList = ['all', 'profile', 'position', 'sceneComms', 'parcelUpdate', 'chat']
export const StatTypeFilterList = [
  'expired',
  'expiredPercentage',
  'packetDuplicates',
  'duplicatePercentage',
  'averagePacketSize',
  'optimistic',
  'packets',
  'totalBytes',
]
function GetStatFilter(key: number) {
  return StatTypeFilterList[key]
}
function GetMessageFilter(key: number) {
  return MessageTypeFilterList[key]
}
export type StatTypeFilter = ReturnType<typeof GetStatFilter>
export type MessageTypeFilter = ReturnType<typeof GetMessageFilter>
