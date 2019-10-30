import {
  Alias,
  ProtocolPositionAction,
  ProtocolProfileAction,
  PROTOCOL_POSITION,
  PROTOCOL_PROFILE
} from '../comms/actions'
import { PassportSuccessAction, PASSPORT_SUCCESS } from '../passports/actions'
import { PeerPresence, PresenceState, UserId } from './types'
import { PositionReport } from './types/PositionReport'
import { unmarshalPositionReport } from './wireTransforms/marshalPositionReport'

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
  switch (action.type) {
    case PROTOCOL_POSITION:
      const positionAction: ProtocolPositionAction = action
      const alias = positionAction.payload.from
      const positionUserId = state.commsAliasToUserId[alias]
      if (!positionUserId) {
        return state
      }
      const report = unmarshalPositionReport(positionAction.payload.position)
      return {
        ...state,
        lastTimestampReceivedByUserId: {
          ...state.lastTimestampReceivedByUserId,
          [positionUserId]: positionAction.payload.position.getTime()
        },
        presenceByUserId: {
          ...state.presenceByUserId,
          [positionUserId]: updateUserReport(state.presenceByUserId[positionUserId], report)
        }
      }
    case PASSPORT_SUCCESS:
      const passportAction: PassportSuccessAction = action
      const { userId } = passportAction.payload
      return {
        ...state,
        presenceByUserId: {
          ...state.presenceByUserId,
          [userId]: state.presenceByUserId[userId]
            ? { ...state.presenceByUserId[userId], hasData: true }
            : newUserPresence(userId, undefined)
        }
      }
    case PROTOCOL_PROFILE:
      const profileAction: ProtocolProfileAction = action
      const profileUserId = profileAction.payload.userId
      if (!profileUserId) {
        return state
      }
      if (!state.commsAliasToUserId[profileAction.payload.alias]) {
        return {
          ...state,
          lastTimestampReceivedByUserId: {
            ...state.lastTimestampReceivedByUserId,
            [profileUserId]: profileAction.payload.profile.getTime()
          },
          commsAliasToUserId: {
            ...state.commsAliasToUserId,
            [profileAction.payload.alias]: profileAction.payload.userId
          },
          presenceByUserId: {
            ...state.presenceByUserId,
            [userId]: state.presenceByUserId[userId]
              ? { ...state.presenceByUserId[userId], peerAlias: profileAction.payload.alias}
              : newUserPresence(userId, profileAction.payload.alias)
          }
        }
      }
      break
  }
  return state
}

function updateUserReport(previous: PeerPresence, report: PositionReport) {
  return {
    ...previous,
    hasPosition: true,
    ...report
  }
}

function newUserPresence(userId: UserId, alias: Alias) {
  return {
    userId,
    peerAlias: alias,
    profileVersion: 0,
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0, w: 0 },
    reportedVisible: true,
    hasPosition: false,
    hasData: false
  }
}
