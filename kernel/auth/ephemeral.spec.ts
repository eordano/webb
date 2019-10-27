import { BasicEphemeralKey, EcdsaKeyPair, MessageInput } from './ephemeral'
import { Buffer } from 'buffer'

describe('ephemeral tests', () => {
  it('test', async () => {
    const ecdsa = new EcdsaKeyPair(
      Buffer.from([
        224,
        226,
        165,
        219,
        62,
        77,
        134,
        183,
        0,
        186,
        28,
        70,
        173,
        225,
        98,
        216,
        66,
        56,
        48,
        56,
        50,
        14,
        207,
        174,
        196,
        221,
        107,
        195,
        122,
        47,
        31,
        81
      ])
    )
    const expected ='e446f59b9750c704f9a424785ae9064556e29e5c2bbe93fd4cf20523d2293c9909bac218f7fbd2de44a73958401fc463328fe22d17e04eb45165e1647a470567'
    // 'cf2e2a1ac9bfc0317e6463f4f51dba0109dddbb808ed0b632c23db5fd9ff0e2963ab4943a32cb08024cd89dfe45b8dfd13186f82bdffc6a984f25402c90ec27e'
    const accessToken =
      'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9' +
      '.eyJlcGhlbWVyYWxfa2V5IjoiMDM2MWU5YzgwN2UwNjBhMGU1NzQzNzM3NmEyZTNlNzAyMDRlZGY2ODYwYTNjMWYzMWVjNDk1ZjJhODFlYzMyOWM4IiwiZXhwIjoxNTcyMjA0NDA3LCJ1c2VyX2lkIjoiZW1haWx8NWNiYzAzNjYyZDVmODQyYTE2OGYzZDYzIiwidmVyc2lvbiI6IjEuMCJ9' +
      '.NcUq_NWEbUn6tBk08wPS2NWmH_V7n86lvGRehBpTSKd0WyFRMDLiI69RWGrrCWJovLJO73CWTQEXYIp6JxuheQ'
    const timestamp = 1572204227
    const key = new BasicEphemeralKey(ecdsa, new Date())
    const params = MessageInput.fromMessage(Buffer.from(''))

    const result = await key.makeMessageCredentials(params, accessToken, timestamp)

    expect(result.get('x-signature')).toBe(expected)
  })
})
