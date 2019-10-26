import { EphemeralKey, MessageInput } from '../../auth/ephemeral'
import { WebRTCBrokerConnection } from './WebRTCBrokerConnection'

export async function createWebRTCBroker(
  coordinatorURL: string,
  input: MessageInput,
  accessToken: string,
  ephemeral: EphemeralKey,
) {
  const credentials = await ephemeral.makeMessageCredentials(input, accessToken)
  const qs = new URLSearchParams({
    signature: credentials.get('x-signature'),
    identity: credentials.get('x-identity'),
    timestamp: credentials.get('x-timestamp'),
    'access-token': credentials.get('x-access-token')
  })
  const url = new URL(coordinatorURL)
  url.search = qs.toString()
  return new WebRTCBrokerConnection(url.toString())
}
