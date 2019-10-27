import secp256k1 from 'secp256k1'
import assert from 'assert'
const { privateKeyVerify, sign, publicKeyCreate } = secp256k1
window['assert'] = assert

export { privateKeyVerify, sign, publicKeyCreate }