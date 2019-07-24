import { Observable } from '@dcl/utils/dist/Observable'
import { UUID, PeerInformation, AvatarMessage, UserInformation, AvatarMessageType, Pose } from '../comms/types'
import { getFromLocalStorage, saveToLocalStorage } from '@dcl/utils/dist/SafeLocalStorage'

export const getBlockedUsers: () => Set<string> = () => new Set(getFromLocalStorage('dcl-blocked-users') || [])
export const getMutedUsers: () => Set<string> = () => new Set(getFromLocalStorage('dcl-muted-users') || [])
export const isMuted = (name: string) => getMutedUsers().has(name)

export const peerMap = new Map<UUID, PeerInformation>()
export const avatarMessageObservable = new Observable<AvatarMessage>()

export let localProfileUUID: UUID | null = null

export function findPeerByName(displayName: string): UserInformation | null {
  for (let [, peer] of peerMap) {
    if (peer.user && peer.user.displayName === displayName) {
      return peer.user
    }
  }
  return null
}

/**
 * Removes both the peer information and the Avatar from the world.
 * @param uuid
 */
export function removeById(uuid: UUID) {
  if (localProfileUUID === uuid) {
    localProfileUUID = null
  }

  if (peerMap.delete(uuid)) {
    avatarMessageObservable.notifyObservers({
      type: AvatarMessageType.USER_REMOVED,
      uuid
    })
  }
}

/**
 * If not exist, sets up a new avatar and profile object
 * @param uuid
 */
export function setUpID(uuid: UUID): PeerInformation | null {
  if (!uuid) return null
  if (typeof (uuid as any) !== 'string') throw new Error('Did not receive a valid UUID')

  let peer: PeerInformation

  if (!peerMap.has(uuid)) {
    peer = {
      uuid,
      flags: {}
    }

    peerMap.set(uuid, peer)
  } else {
    peer = peerMap.get(uuid) as PeerInformation
  }

  return peer
}

export function receiveUserData(uuid: string, data: Partial<UserInformation>) {
  const peerData = setUpID(uuid)
  if (peerData) {
    const userData = peerData.user || (peerData.user = peerData.user || {})

    const profileChanged =
      (data.displayName && userData.displayName !== data.displayName) ||
      (data.publicKey && userData.publicKey !== data.publicKey) ||
      (data.avatarType && userData.avatarType !== data.avatarType)

    if (profileChanged) {
      Object.assign(userData, data)

      avatarMessageObservable.notifyObservers({
        type: AvatarMessageType.USER_DATA,
        uuid,
        data
      })
    }
  }
}

export function receiveUserPose(uuid: string, pose: Pose) {
  avatarMessageObservable.notifyObservers({
    type: AvatarMessageType.USER_POSE,
    uuid,
    pose
  })
}

/**
 * In some cases, like minimizing the window, the user will be invisible to the rest of the world.
 * This function handles those visible changes.
 */
export function receiveUserVisible(uuid: string, visible: boolean) {
  avatarMessageObservable.notifyObservers({
    type: AvatarMessageType.USER_VISIBLE,
    uuid,
    visible
  })
}

export function addToBlockedUsers(uuid: string): Set<string> {
  const blockedUsers = getBlockedUsers()

  if (!blockedUsers.has(uuid)) {
    const updatedSet = blockedUsers.add(uuid)
    saveToLocalStorage('dcl-blocked-users', Array.from(updatedSet))

    avatarMessageObservable.notifyObservers({
      type: AvatarMessageType.USER_BLOCKED,
      uuid
    })

    return updatedSet
  }

  return blockedUsers
}

export function removeFromBlockedUsers(uuid: string): Set<string> {
  const blockedUsers = getBlockedUsers()
  blockedUsers.delete(uuid)
  saveToLocalStorage('dcl-blocked-users', Array.from(blockedUsers))

  avatarMessageObservable.notifyObservers({
    type: AvatarMessageType.USER_UNBLOCKED,
    uuid
  })

  return blockedUsers
}

export function addToMutedUsers(uuid: string): Set<string> {
  const mutedUsers = getMutedUsers()

  if (!mutedUsers.has(uuid)) {
    const updatedSet = mutedUsers.add(uuid)
    saveToLocalStorage('dcl-muted-users', Array.from(updatedSet))

    avatarMessageObservable.notifyObservers({
      type: AvatarMessageType.USER_MUTED,
      uuid
    })

    return updatedSet
  }

  return mutedUsers
}

export function removeFromMutedUsers(uuid: string): Set<string> {
  const mutedUsers = getMutedUsers()
  mutedUsers.delete(uuid)
  saveToLocalStorage('dcl-muted-users', Array.from(mutedUsers))

  avatarMessageObservable.notifyObservers({
    type: AvatarMessageType.USER_UNMUTED,
    uuid
  })

  return mutedUsers
}
