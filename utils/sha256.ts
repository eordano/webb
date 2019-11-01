import { Buffer } from 'buffer'

export async function sha256asString(data: string) {
  const hash = await sha256(data)
  return hash.toString('hex')
}

export async function sha256(data: string | Buffer | Uint8Array | ArrayBuffer) {
  const crypto = typeof window !== 'undefined' && window.crypto || require('crypto') as any
  if (crypto.createHash) {
    return crypto
      .createHash('sha256')
      .update(data)
      .digest()
  } else if (crypto.subtle) {
    let hash = await (Buffer.isBuffer(data)
        ? crypto.subtle.digest('SHA-256', data)
        : crypto.subtle.digest('SHA-256', Buffer.from(data as any)))
    if (!Buffer.isBuffer(hash)) {
      hash = Buffer.from(hash)
    }
    return hash
  } else {
    throw new Error('Incompatible argument: could not SHA256')
  }
}
