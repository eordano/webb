import { stableStringify } from 'dcl/utils'
import { Address, isAddress } from './Address'
import { CryptographicIdentity, PublicCryptographicIdentity } from './CryptographicIdentity'
import { SignedMessage, createSignedMessage, validateSignedMessage } from './SignedMessage'
import { CHAINED_ADDRESS } from './constants'
/**
 * We introduce the concept of a chained signature with an "chained key".
 * This is similar to what the X.509 standard does for a certification path (RFC 5280).
 */
export type ChainedCertificatedMessage = SignedMessage[]

export function createAddressCertificateLink(
  rootIdentity: CryptographicIdentity,
  childIdentity: PublicCryptographicIdentity
) {
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
    if (!isAddress(chained.childAddress)) {
      return false
    }
    return validateChainedSignature(chained.childAddress, messages.slice(1))
  } catch (e) {
    return false
  }
}
