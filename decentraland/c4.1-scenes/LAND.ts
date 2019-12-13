import { Address, isAddress } from '../c1-basics/Address'
/**
 * LAND parcels are records on the ethereum blockchain.
 * They have unique X and Y coordinates and are exclusively owned by a public key.
 *
 * The hash of that public key is called "the owner address".
 */
export type LAND = {
  x: number
  y: number
  owner: Address
}

export function isLAND(land: any): land is LAND {
  return typeof land === 'object' && typeof land.x === 'number' && typeof land.y === 'number' && isAddress(land.owner)
}
