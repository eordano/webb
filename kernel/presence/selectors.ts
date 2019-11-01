import { PeerPresence, RootPresenceState, UserId } from './types'
import { Alias } from '../comms/actions'
import { zip } from 'dcl/utils'

export function getPresenceByUserId(root: RootPresenceState, userId: UserId): PeerPresence | undefined {
  return root.presence.presenceByUserId[userId]
}

export function shouldUserRender(root: RootPresenceState, userId: UserId): boolean {
  return isPresenceRendereable(getPresenceByUserId(root, userId))
}

export function isPresenceRendereable(presence: PeerPresence) {
  return presence.hasData && presence.reportedVisible && presence.hasPosition
}

export function getAllRenderablePresences(root: RootPresenceState): PeerPresence[] {
  return Object.values(root.presence.presenceByUserId).filter(isPresenceRendereable)
}

export function getAllPresencesByAlias(root: RootPresenceState): Record<number, PeerPresence> {
  return zip(Object.values(root.presence.presenceByUserId).map(presence => ([presence.peerAlias, presence])))
}

export function getPresenceByAlias(root: RootPresenceState, peerAlias: Alias): PeerPresence | undefined {
  const userId = root.presence.commsAliasToUserId[peerAlias]
  return getPresenceByUserId(root, userId)
}
