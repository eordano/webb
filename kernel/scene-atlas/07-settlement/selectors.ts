import { RootSettlementState } from './types'

export function isPositionSettled(state: RootSettlementState) {
  return state.settlement.isSettled
}
