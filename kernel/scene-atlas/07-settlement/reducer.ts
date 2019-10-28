import { AnyAction } from 'redux'
import { SettlementState } from './types'

export const INITIAL_SETTLEMENT_STATE: SettlementState = {
    isSettled: false,
    isTeleporting: false,
    targetSpawnPoint: null,
    teleportTarget: null
}

export function settlementReducer(state: SettlementState, action: AnyAction): SettlementState {
  if (!state) {
    return INITIAL_SETTLEMENT_STATE
  }
  if (!action) {
    return state
  }
  return state
}
