import { PeerPresence, RootPresenceState, UserId } from './types'
import { Alias } from '../comms/actions'

export function getPresenceByUserId(root: RootPresenceState, userId: UserId): PeerPresence | undefined {
  return root.presence.presenceByUserId[userId]
}

export function shouldUserRender(root: RootPresenceState, userId: UserId): boolean {
  const presence = getPresenceByUserId(root, userId)
  return presence.hasData && presence.reportedVisible && presence.hasPosition
}

export function getPresenceByAlias(root: RootPresenceState, peerAlias: Alias): PeerPresence | undefined {
  const userId = root.presence.commsAliasToUserId[peerAlias]
  return getPresenceByUserId(root, userId)
}
