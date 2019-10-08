import { parseParcelPosition, Vector2 } from '@dcl/utils'
import { action } from 'typesafe-actions'
import { StringPosition } from '../01-user-position/types'
import { SETTLE_POSITION, SPAWN_USER_AT, TELEPORT, UNSETTLE_POSITION } from './types'

export const teleportToGridString = (target: StringPosition, spawnPointName?: string) =>
  action(TELEPORT, { teleportTarget: parseParcelPosition(target), spawnPointName })
export type TeleportAction = ReturnType<typeof teleportToGridString>

export const teleportToTarget = (teleportTarget: Vector2, spawnPointName?: string): TeleportAction =>
  action(TELEPORT, { teleportTarget, spawnPointName })

export const spawnUserAt = (teleportTarget: Vector2, spawnPointName?: string) =>
  action(SPAWN_USER_AT, { teleportTarget, spawnPointName })
export type SpawnUserAtAction = ReturnType<typeof spawnUserAt>

export const settlePosition = () => action(SETTLE_POSITION)
export type SettlePositionAction = ReturnType<typeof settlePosition>

export const unsettlePosition = () => action(UNSETTLE_POSITION)
export type UnsettlePositionAction = ReturnType<typeof unsettlePosition>

export type PositionSettlementAction =
  | SettlePositionAction
  | UnsettlePositionAction
  | TeleportAction
  | SpawnUserAtAction
