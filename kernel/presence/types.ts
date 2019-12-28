import { ReadOnlyQuaternion, Vector3 } from 'dcl/utils'
import { Profile } from '../passports/types'

export type UserId = string
export type LastSeenTimestamp = number
export type Timestamp = number
export type TopicId = string
export type TargetLocation = string

export type RendereablePeer = {
  userId: UserId
  presence: PeerPresence
  profile: Profile
}

export type PeerPresence = {
  userId: UserId
  peerAlias: any
  profileVersion: number
  position: Vector3
  rotation: ReadOnlyQuaternion
  reportedVisible: boolean
  hasData: boolean
  hasPosition: boolean
  /**
   * For future reference
   *  animation: string
   *  animationStarted: string
   *  animationQueue: string[]
   */
}

export type PresenceState = {
  commsAliasToUserId: Record<string, UserId>
  lastTimestampReceivedByUserId: Record<UserId, Timestamp>
  presenceByUserId: Record<UserId, PeerPresence>
}

export type RootPresenceState = {
  presence: PresenceState
}
