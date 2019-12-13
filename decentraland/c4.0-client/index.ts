import { Address } from '../c1-basics/Address'
import { ChainedCertificatedMessage } from '../c1-basics/ChainedCertificatedMessage'
import { CryptographicIdentity } from '../c1-basics/CryptographicIdentity'
import { Passport } from "../Passport"
import { Timestamp } from './Timestamp'
import { UserPreferences } from './UserPreferences'

/**
 * The first action the client does is to check if the user already has a session in this browser.
 *
 * A Session is compressed of all the stored information about who the user is and what are their personal preferences.
 */
export type Session = {
  userAddress: Address
  hasWeb3: boolean
  isWeb3Activated: boolean
  ephemeralKey: CryptographicIdentity
  ephemeralKeyProof: ChainedCertificatedMessage
  ephemeralKeyExpiration: Timestamp

  profile: Passport
  settings: UserPreferences
}

/**
 * Then, we follow this diagram to log the user in:
 * ```mermaidjs.github.io
 * graph TD
 *   Start --> W3{Check Web3}
 *   Start --> SC(Select Katalyst from List)
 *   W3 --> |Present|AP{Ask permission}
 *   W3 --> |Not present|LID
 *   AP --> |Given|HCN{Has Claimed Name?}
 *   Feedback --> AP
 *   HCN --> |Yes|RID(Remote ID Initialization)
 *   HCN --> |No|LID(Local ID)
 *   LID --> AS
 *   SC --> DAA(Download Avatar Assets)
 *   DAA --> AS(Avatar Setup)
 *   AP --> |Not given|Feedback(Feedback: <br/>Can't play if you don't accept)
 *   RID --> PN(Pick Name out of all ENS for this Address)
 *   PN --> DP(Download Profile)
 *   DP --> GEP
 *   AS --> CNP(Claim Name Prompt)
 *   CNP --> GEP(Get ephemeral key & Sign it)
 *   GEP --> PS(Pick Start Location)
 *   PS --> DSS(Download & Start Scenes)
 *   DSS --> AR(Activate Renderer)
 * ```
 */
