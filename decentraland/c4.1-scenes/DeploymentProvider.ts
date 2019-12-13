import { ChainedCertificatedMessage } from '../c1-basics/ChainedCertificatedMessage'
import { Coordinate } from '../c1-basics/Coordinate'

/**
 * Interface for retrieving deployment information about a parcel.
 * We can't trust this, as it's off-chain.
 */
export type DeploymentProvider = {
  getDeployment: (coordinate: Coordinate) => ChainedCertificatedMessage;
}
