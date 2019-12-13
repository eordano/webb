import { PathAndHash } from '../c2-content/PathAndHash'
export type BodyShapeRespresentation = {
  bodyShapes: string[]
  mainFile: string
  contents: PathAndHash[]
  hides?: string[]
  replaces?: string[]
}
