import { ChainedCertificatedMessage, createAddressCertificateLink } from './ChainedCertificatedMessage'
import { LAND } from './LAND'
import { safeGetMessage } from './safeGetMessage'
import { createSignedMessage } from './SignedMessage'
import { secondTestIdentity, testIdentity } from './testIdentity'
import { Coordinate } from './Coordinate'
import { isValidCoordinate } from 'dcl/utils'

const link = createAddressCertificateLink(testIdentity, secondTestIdentity)

/**
 * Interface for retrieving ownership information about a coordinate. The information returned is trusted.
 */
export type LANDOwnershipProvider = {
  getLAND: (coordinate: Coordinate) => LAND
}

/**
 * Interface for retrieving deployment information about a parcel. We can't trust this, as it's off-chain.
 */
export type DeploymentProvider = {
  getDeployment: (coordinate: Coordinate) => ChainedCertificatedMessage
}

export const FakeLAND: LANDOwnershipProvider = {
  getLAND(coordinate: Coordinate): LAND {
    function fakeLand(x: number, y: number) {
      if (x < 10 && x > -10 && y < 10 && y > -10) {
        return { x, y, owner: testIdentity.address }
      }
    }
    if (isValidCoordinate(coordinate)) {
      return fakeLand(coordinate.x, coordinate.y)
    } else {
      throw new TypeError('Invalid arguments: must provide a coordinate or two numbers')
    }
  }
}

export const FakeContentProvider: DeploymentProvider = {
  getDeployment(coordinate: Coordinate): ChainedCertificatedMessage {
    const { x, y } = coordinate
    return [
      link,
      createSignedMessage(secondTestIdentity, {
        x,
        y,
        content: `This is the content of land ${x},${y}, owned by ${testIdentity.address} and signed by ${secondTestIdentity.address}`
      })
    ]
  }
}

export function getDeploymentAndValidate(
  provider: LANDOwnershipProvider,
  content: DeploymentProvider,
  coordinate: Coordinate,
) {
  const land = provider.getLAND(coordinate)
  if (coordinate === undefined) {
    return
  }
  const landInfo = content.getDeployment(coordinate)
  if (landInfo === undefined) {
    return
  }
  return safeGetMessage(land.owner, landInfo)
}
