export const Communications = {
  debug: true,

  commRadius: 4,

  peerTtlMs: 60000,

  maxVisiblePeers: 25,

  ephemeralKeyTTL: 60 * 60 * 2,

  iceServers: [
    {
      urls: 'stun:stun.l.google.com:19302'
    },
    {
      urls: 'stun:stun2.l.google.com:19302'
    },
    {
      urls: 'turn:stun.decentraland.org:3478',
      credential: 'passworddcl',
      username: 'usernamedcl'
    }
  ]
}

export const PUBLIC_KEY_SOURCE = 'https://auth.decentraland.today/api/v1/public_key'
export const PINNED_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEo/cpceJdDp1Q/37nU1Ozd7BKCmai
MtXhbxYR8Pk84qwGBBsrdbTLC1g/GfesANgxMEgrZShP2DxeaCB0rB8p7A==
-----END PUBLIC KEY-----`
