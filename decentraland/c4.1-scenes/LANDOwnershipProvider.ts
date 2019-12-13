import { Coordinate } from '../c1-basics/Coordinate'
import { LAND } from './LAND'

/**
 * Interface for retrieving ownership information about a coordinate. The information returned is trusted.
 */
export type LANDOwnershipProvider = {
  getLAND: (coordinate: Coordinate) => LAND;
}
