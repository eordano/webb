import { Address } from './Address'

/**
 * But Decentraland is not only about validating LAND deployments. It's a social world, and in addition to
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
  }
  version: number
  createdAt: number
}

/**
 * But what is a Wearable?
 */
export type BodyShapeId = string

export type WearableId = string

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
