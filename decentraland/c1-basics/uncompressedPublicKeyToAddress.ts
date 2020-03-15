import { keccak256 } from 'ethereum-cryptography/keccak'

export function uncompressedPublicKeyToAddress(uncompressedPublicKey: Uint8Array) {
  return (
    '0x' +
    keccak256(Buffer.from(uncompressedPublicKey.subarray(1)))
      .subarray(12)
      .toString('hex')
  )
}
