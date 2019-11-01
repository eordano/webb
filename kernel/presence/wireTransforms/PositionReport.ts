import { ReadOnlyVector3, ReadOnlyQuaternion } from 'dcl/utils'

export type PositionReport = {
  /** Camera position, world space */
  position: ReadOnlyVector3
  /** Camera rotation */
  rotation: ReadOnlyQuaternion
  /** Camera height, relative to the feet of the avatar or ground */
  playerHeight: number
}
