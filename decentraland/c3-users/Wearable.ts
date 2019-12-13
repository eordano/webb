import { BodyShapeRespresentation } from './BodyShapeRespresentation'
/**
 * A wearable is the visual representation of an NFT in 2D or 3D.
 * 
 * It can apply differently to different kinds of body shapes (i.e., Dinosaur, Male, Female...)
 */
export type Wearable = {
  id: WearableId
  type: 'wearable'
  category: string
  baseUrl: string
  tags: string[]
  representations: BodyShapeRespresentation[]
}
export type WearableId = string
