import { ChainedCertificatedMessage } from '../c1-basics/ChainedCertificatedMessage'
import { CID, ContentEntity, PointerName, PointerValue } from './index'

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
