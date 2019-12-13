import { ChainedCertificatedMessage } from '../c1-basics/ChainedCertificatedMessage'
import { Coordinate } from '../c1-basics/Coordinate'
import { Address } from '../c1-basics/Address'

export type UpdateResult = {
  success: boolean
  feedback: string
}

/**
 * A PointerName is a way to identify a particular ContentEntity
 */
export type PointerName = string
export type PointerValue = string

/**
 * ContentEntities are the basic unit stored by the content server
 */
export type ContentEntity = {
  id: CID
  pointers: PointerName[]
  metadata: any
}

export type ContentProof = {
  entityId: CID
  signature: ChainedCertificatedMessage
}

/**
 * A CID is a 42-length Base58 identifier of some file by its hash
 */
export type CID = string

/**
 * LAND ownership is more complex than expressed in the previous section
 */
export type LANDOwnershipInformation = {
  owner: UpdateOperatorOwnerInfo
  title: string
  description: string
  type: LANDType
  updateOperators: Address[]
}
export type UpdateOperatorOwnerInfo = {
  address: Address
  operators: Address[]
  updateManagers: Address[]
}
export type EstateOwnershipInformation = {
  estateId: number
  title: string
  description: string
  owner: UpdateOperatorOwnerInfo
  parcels: Coordinate[]
  updateOperators: Address[]
}
export type ParcelOwnershipInformation = {
  position: Coordinate
  land: LANDOwnershipInformation
  estate?: EstateOwnershipInformation
}

export function validateAddressCanDeploy(
  address: Address,
  coordinates: Coordinate[],
  parcel: ParcelOwnershipInformation
): boolean {
  return false
}

export enum LANDType {
  'Empty parcel',
  'Road',
  'Plaza',
  'District',
  'Private scene'
}
