/**
 * What is Decentraland?
 *
 * Decentraland is a virtual world owned by its users.
 *
 * Modeled after some of the most interesting developments of the past decades,
 * it's a consensus-system to get a render of a shared space.
 *
 * Space is defined in a 2D grid of units called LAND parcels.
 *
 * LAND parcels are records on the ethereum blockchain.
 * They have unique X and Y coordinates and are exclusively owned by a public key.
 *
 * The hash of that public key is called "the owner address".
 */
export type LAND = {
  x: number
  y: number
  owner: Address
}

/**
 * Addresses are Ethereum's identity system. They look like this:
 * `0x0f5d2fb29fb7d3cfee444a200298f468908cc942`
 *
 * Some addresses have an associated Public Key.
 *
 * Some addresses are an Ethereum Contract.
 */
export type Address = string
export const ADDRESS_LENGTH = 42
export function validateAddress(address: any): address is Address {
  return typeof address === 'string' && address.startsWith('0x') && address.length === ADDRESS_LENGTH
}

/**
 * One can easily create a Private Key.
 *
 * As a user, this is what identifies you. You can create any number of private keys you want, but if you
 * lose this data, you'll lose your identity, and you won't be able to show proof of who you say you are.
 */

export type CryptographicIdentity = {

  privateKey: Buffer

} & PublicCryptographicIdentity

export type PublicCryptographicIdentity = {

  publicKey: Buffer

  address: Address

}

import { getRandomBytesSync } from 'ethereum-cryptography/random'
import { keccak256 } from 'ethereum-cryptography/keccak'
import { publicKeyCreate } from 'ethereum-cryptography/secp256k1'

export function createAddress(uncompressedPublicKey: Buffer) {
  return (
    '0x' +
    keccak256(uncompressedPublicKey.subarray(1))
      .subarray(12)
      .toString('hex')
  )
}

export const UNCOMPRESSED = false

export function createIdentity(privateKeyBackup?: Buffer): CryptographicIdentity {
  const privateKey = privateKeyBackup ? privateKeyBackup : getRandomBytesSync(32)
  const publicKeyToEncode = publicKeyCreate(privateKey, UNCOMPRESSED)
  const publicKey = publicKeyCreate(privateKey)
  const address = createAddress(publicKeyToEncode)
  return {
    privateKey,
    publicKey,
    address
  }
}

/**
 * In order to recover a private key it would be helpful to validate the input
 */

export const HEXADECIMAL_REGEXP = /^[0-9a-fA-F]+$/
export const PRIVATE_KEY_LENGTH_IN_HEXA = 64

import { privateKeyVerify } from 'ethereum-cryptography/secp256k1'

export function recoverIdentity(privateKeyAsHexadecimalString: string): CryptographicIdentity {
  if (typeof privateKeyAsHexadecimalString !== 'string') {
    throw new Error(`An invalid private key was provided: ${privateKeyAsHexadecimalString}: it should be a string`)
  }
  if (!HEXADECIMAL_REGEXP.test(privateKeyAsHexadecimalString)) {
    throw new Error(
      `An invalid private key was provided: ${privateKeyAsHexadecimalString}: it should be in hexadecimal format`
    )
  }
  if (privateKeyAsHexadecimalString.length !== PRIVATE_KEY_LENGTH_IN_HEXA) {
    throw new Error(`An invalid private key was provided: ${privateKeyAsHexadecimalString}: it should be 256bits long`)
  }
  const privateKey = Buffer.from(privateKeyAsHexadecimalString, 'hex')
  if (!privateKeyVerify(privateKey)) {
    throw new Error(
      `An invalid private key was provided: ${privateKeyAsHexadecimalString}: it is not a valid value for the secp256k1 curve`
    )
  }
  return createIdentity(privateKey)
}



export const testIdentity = recoverIdentity('670915F67686D8B24678451642751E4606A2F50623079C7EEF479FC2C0AD80DF')


/**
 * If the address corresponds to the hash of a Public key, then they can sign messages
 */
export type SignedMessage = {
  payload: string // TODO: Could this be an object?
  hash: string
  signature: string
  signingAddress: Address
}

export type ValidMessage = SignedMessage
import { sign, recover, publicKeyConvert } from 'ethereum-cryptography/secp256k1'

export function validateSignedMessage(message: SignedMessage): message is ValidMessage {
  const hash = keccak256(Buffer.from(message.payload))
  if (hash.toString('hex') !== message.hash) {
    return false
  }
  const signature = Buffer.from(message.signature.slice(0, 128), 'hex')
  const recoveredPublicKey = recover(hash, signature.slice(0, 64), parseInt(message.signature.slice(128)))
  return createAddress(publicKeyConvert(recoveredPublicKey, UNCOMPRESSED)) === message.signingAddress
}

export function createSignedMessage(identity: CryptographicIdentity, message: string | object): ValidMessage {
  const payload = typeof message === 'string' ? message : JSON.stringify(message)
  const hash = keccak256(Buffer.from(payload))
  const signature = sign(hash, identity.privateKey)
  return {
    payload,
    hash: hash.toString('hex'),
    signature: signature.signature.toString('hex') + signature.recovery.toString(),
    signingAddress: identity.address
  }
}

/**
 * We introduce the concept of a chained signature with an "chained key".
 * This is similar to what the X.509 standard does for a certification path (RFC 5280).
 */
export type ChainedCertificatedMessage = SignedMessage[]

const childIdentity = createIdentity()
import { stableStringify } from './stableStringify'
export const CHAINED_ADDRESS = 'Chained Address'

export function createAddressCertificateLink(rootIdentity: CryptographicIdentity, childIdentity: PublicCryptographicIdentity) {
  return createSignedMessage(
    rootIdentity,
    stableStringify({
      type: CHAINED_ADDRESS,
      childAddress: childIdentity.address
    })
  )
}
export function validateChainedSignature(sender: Address, messages: ChainedCertificatedMessage) {
  // Recursion:
  // The invariant is: "sender" is a trusted sender
  // We're going to validate one link of the chain, and recurse
  const message = messages[0]
  if (!validateSignedMessage(message)) {
    return false
  }
  // If the message was not signed by the current trusted sender, reject the chain
  if (sender !== message.signingAddress) {
    return false
  }
  // If this is the last message, then the chain was successfully validated
  if (messages.length === 1) {
    return true
  }
  // Otherwise, we need to check that the current message is a valid link to another Chained Key
  try {
    const chained = JSON.parse(message.payload)
    if (typeof chained !== 'object') {
      return false
    }
    if (chained.type !== CHAINED_ADDRESS) {
      return false
    }
    if (!validateAddress(chained.childAddress)) {
      return false
    }
    return validateChainedSignature(chained.childAddress, messages.slice(1))
  } catch (e) {
    return false
  }
}
export function safeGetMessage(sender: Address, messages: ChainedCertificatedMessage): string | object {
    if (validateChainedSignature(sender, messages)) {
        return messages[messages.length - 1].payload
    }
}

const chain = createAddressCertificateLink(testIdentity, childIdentity)

/**
 * Here are some examples of chained signatures:
 *
 * ```
 *   console.log(validateChainedSignature(testIdentity.address, [
 *       chain,
 *       signedByChild
 *   ]))
 *
 *   const thirdKey = createIdentity()
 *   const newChainLink = createCertificateChain(childIdentity, thirdKey)
 *   const signedByThirdChild = createSignedMessage(thirdKey, 'Sent by third key')
 *   console.log(validateChainedSignature(testIdentity.address, [
 *       chain,
 *       newChainLink,
 *       signedByThirdChild
 *   ]))
 *
 *   console.log('Now, some failure cases')
 *
 *   console.log(validateChainedSignature(testIdentity.address, [
 *       newChainLink,
 *       chain,
 *       signedByThirdChild
 *   ]))
 *
 *   console.log(validateChainedSignature(testIdentity.address, [
 *       chain,
 *       newChainLink,
 *       signedByChild
 *   ]))
 * ```
 */

/**
 * Now that we have a basic public key infrastructure, let's add a source of trusted information.
 * We'll later plug this to information validated from a blockchain.
 */

/**
 * Interface for retrieving ownership information about a coordinate. The information returned is trusted.
 */
export type LANDOwnershipProvider = {
  getLAND: (x: number, y: number) => LAND
}
/**
 * Interface for retrieving deployment information about a parcel. We can't trust this, as it's off-chain.
 */
export type DeploymentProvider = {
  getDeployment: (x: number, y: number) => ChainedCertificatedMessage
}

export const FakeLAND: LANDOwnershipProvider = {
  getLAND: (x: number, y: number) => {
    if (x < 10 && x > -10 && y < 10 && y > -10) {
      return { x, y, owner: testIdentity.address }
    }
  },
}
export const FakeContentProvider: DeploymentProvider = {
  getDeployment(x: number, y: number): ChainedCertificatedMessage {
    return [
      chain,
      createSignedMessage(childIdentity, {
        x,
        y,
        content: `This is the content of land ${x},${y}, owned by ${testIdentity.address} and signed by ${childIdentity.address}`
      })
    ]
  }
}

export function getDeploymentAndValidate(provider: LANDOwnershipProvider, content: DeploymentProvider, x: number, y: number) {
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

/**
 * getDeploymentAndValidate(FakeLAND, FakeContentProvider, 2, 0))
 */

/**
 * But Decentraland is not only about validating LAND deployments. It's a social world, and in addition to
 * having LAND, you can contact other citizens. Having a Decentraland Passport links your cryptographic
 * identity to a name.
 */
export type BodyShapeId = string
export type WearableId = string
export type Passport = {
    name: string
    address: Address,
    bio: string,
    avatar: {
        bodyShape: BodyShapeId,
        wearables: WearableId[]
    },
    version: number,
    createdAt: number,
}

/**
 * But what is a Wearable?
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
ut}

export type FileAndHash = {
  file: string
  hash: string
}