import { identityFromPrivateKey } from './identityFromPrivateKey'

/**
 * Creates a {@link CryptographicIdentity} identity from random values.
 */
export const createNewIdentity = () => identityFromPrivateKey()
