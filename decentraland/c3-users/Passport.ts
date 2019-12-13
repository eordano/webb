import { Address } from '../c1-basics/Address'
import { WearableId } from './Wearable'
import { RGBAStringColor } from './RGBAStringColor'
import { BodyShapeId } from './BodyShapeId'
/**
 * Decentraland is not only about validating LAND deployments. It's a social world, and in addition to
 * having LAND, you can contact other citizens. Having a Decentraland Passport links your cryptographic
 * identity to a name.
 */
export type Passport = {
  name: string
  address: Address
  bio: string
  avatar: {
    bodyShape: BodyShapeId
    wearables: WearableId[]
    /**
     * Also known as "Skin tone"
     */
    primaryColor: RGBAStringColor
    /**
     * Also known as "Hair color"
     */
    secondaryColor: RGBAStringColor
    /**
     * Also known as "Eye color"
     */
    ternaryColor: RGBAStringColor
  }
  version: number
  createdAt: number
}
