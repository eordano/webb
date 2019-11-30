import { createAddressCertificateLink, validateChainedSignature } from './ChainedCertificatedMessage'
import { createNewIdentity } from "./createNewIdentity"
import { createSignedMessage } from './SignedMessage'
import { secondTestIdentity, testIdentity } from './testIdentity'

const thirdTestIdentity = createNewIdentity()
const link = createAddressCertificateLink(testIdentity, secondTestIdentity)
const signedByChild = createSignedMessage(secondTestIdentity, 'Message by second identity')
const link2 = createAddressCertificateLink(secondTestIdentity, thirdTestIdentity)
const signedByThirdChild = createSignedMessage(thirdTestIdentity, 'Sent by third key')

describe('ChainedCertificate', () => {
  it('can be created from two identities', () => {
    expect(typeof link.hash).toBe('string')
  })

  it('creates valid link signatures', () => {
    expect(validateChainedSignature(testIdentity.address, [link, signedByChild])).toBe(true)
  })

  it('validates correctly through a chain of signatures', () => {
    expect(validateChainedSignature(testIdentity.address, [link, link2, signedByThirdChild])).toBe(true)
  })

  it(`doesn't work if it's not in the correct order`, () => {
    expect(validateChainedSignature(testIdentity.address, [link2, link, signedByThirdChild])).toBe(false)
    expect(validateChainedSignature(testIdentity.address, [link2, link, signedByChild])).toBe(false)
  })
})
