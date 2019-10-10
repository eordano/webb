import { Vector2 } from '@dcl/utils'

export type SettlementState = {
  isSettled: boolean
  isTeleporting: boolean
  teleportTarget: Vector2
  targetSpawnPoint: string
}

export type RootSettlementState = {
  settlement: SettlementState
}

export const SPAWN_USER_AT = 'Spawn user at coordinates'
export const TELEPORT = 'Teleporting the user to another scene'
export const SETTLE_POSITION = 'Position has settled'
export const UNSETTLE_POSITION = 'Position has unsettled'
