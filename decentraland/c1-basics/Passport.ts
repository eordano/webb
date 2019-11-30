import { Address } from './Address'

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
export type BodyShapeId = string

/**
 * A '#deadcafe' kind of string (R, G, B, A) -- 9 digits describing red, green, blue, and alpha channels
 */
export type RGBAStringColor = string

export type WearableId = string

/**
 * But what is a Wearable?
 * TODO: Document
 */
export type Wearable = {
  id: WearableId
  type: 'wearable'
  category: string
  baseUrl: string
  tags: string[]
  representations: BodyShapeRespresentation[]
}

export type BodyShapeRespresentation = {
  bodyShapes: string[]
  mainFile: string
  contents: FileAndHash[]
  hides?: string[]
  replaces?: string[]
}

export type FileAndHash = {
  file: string
  hash: string
}
