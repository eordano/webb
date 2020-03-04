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
