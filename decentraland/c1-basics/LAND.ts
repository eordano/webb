import { Address, isAddress } from './Address'
/**
 * What is Decentraland?
 *
 * Decentraland is a virtual world owned by its users.
 *
 * Modeled after some of the most interesting developments of the past decades,
 * it's a consensus-system to get a render of a shared space.
 *
 * Space is defined in a 2D grid of units called LAND parcels.
 *
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
