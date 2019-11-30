import { ChainedCertificatedMessage, createAddressCertificateLink } from './ChainedCertificatedMessage'
import { LAND } from './LAND'
import { safeGetMessage } from './safeGetMessage'
import { createSignedMessage } from './SignedMessage'
import { secondTestIdentity, testIdentity } from './testIdentity'

const link = createAddressCertificateLink(testIdentity, secondTestIdentity)

/**
 * Now that we have a basic public key infrastructure, let's add a source of trusted information.
 * We'll later plug this to information validated from a blockchain.
 */

/**
 * Interface for retrieving ownership information about a coordinate. The information returned is trusted.
 */
export type LANDOwnershipProvider = {
  getLAND: (x: number, y: number) => LAND | undefined
}
/**
 * Interface for retrieving deployment information about a parcel. We can't trust this, as it's off-chain.
 */
export type DeploymentProvider = {
  getDeployment: (x: number, y: number) => ChainedCertificatedMessage
}

export const FakeLAND: LANDOwnershipProvider = {
  getLAND(x: number, y: number): LAND | undefined {
    if (x < 10 && x > -10 && y < 10 && y > -10) {
      return { x, y, owner: testIdentity.address }
    }
  }
}
export const FakeContentProvider: DeploymentProvider = {
  getDeployment(x: number, y: number): ChainedCertificatedMessage {
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
  x: number,
  y: number
) {
  const land = provider.getLAND(x, y)
  if (land === undefined) {
    return
  }
  const landInfo = content.getDeployment(x, y)
  if (landInfo === undefined) {
    return
  }
  return safeGetMessage(land.owner, landInfo)
}
