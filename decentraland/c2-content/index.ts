import { ChainedCertificatedMessage } from '../c1-basics/ChainedCertificatedMessage'
import { Coordinate } from '../c1-basics/Coordinate'
import { Address } from '../c1-basics/Address'

/**
 * How does content get distributed in Decentraland?
 *
 * In order to retrieve information related to content in Decentraland, there is a series of public nodes,
 * catalysts, that contain all the information required to render the world, running the scripts associated
 * with scenes, and contact you with other persons around you.
 *
 * These two functions of catalysts are often referred to as the "content server" and the "comms server"
 */

export type CatalystProvider = {
  currentUrls: string[]
}

/**
 * Remote interface to a Content Server
 */
export type RemoteContentServer = {
  listPointers: Promise<PointerName[]> // Currently supporting: 'parcel', 'name', 'wearableId'

  getEntitiesByPointer(pointers: string[]): Promise<ContentEntity>

  updatePointers(
    pointerName: PointerName,
    pointerValues: string[],
    entity: ContentEntity,
    proof: ChainedCertificatedMessage
  ): Promise<UpdateResult>

  getAsset(entityId: CID): Promise<Buffer>
  getProof(entityId: CID): Promise<ChainedCertificatedMessage>

  getAssetByPointerAndPath(pointerName: PointerName, pointerValue: PointerValue, path: string): Promise<Buffer>
}

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
