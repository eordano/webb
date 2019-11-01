import { zip } from 'dcl/utils'
import { PeerPresence, RendereablePeer } from '../types'

const TransformType = 1
const AvatarShapeType = 56

export function getAvatarsAsECSMessages(peers: RendereablePeer[]) {
  return zip(peers.map(peer => [peer.userId, buildCreateAvatarMessages(peer)]))
}

function buildCreateAvatarMessages(peer: RendereablePeer) {
  return [
    buildCreateEntity('' + peer.presence.peerAlias),
    buildTransformMessage(peer.presence),
    buildAvatarsShapeMessage(peer)
  ]
}

function buildCreateEntity(id: string) {
  return ['CreateEntity', id]
}

function buildTransformMessage(presence: PeerPresence) {
  return ['UpdateEntityComponent', '' + presence.peerAlias, TransformType, buildTransformFromPresence(presence)]
}

function buildAvatarsShapeMessage(peer: RendereablePeer) {
  return ['UpdateEntityComponent', '' + peer.presence.peerAlias, AvatarShapeType, buildAvatarShapeFromPresence(peer)]
}

function buildTransformFromPresence(presence: PeerPresence) {
  return { position: presence.position, rotation: presence.rotation, scale: { x: 1, y: 1, z: 1 } }
}

function buildAvatarShapeFromPresence(peer: RendereablePeer) {
  return { id: '' + peer.presence.peerAlias, useDummyModel: false, name: peer.profile.name, ...peer.profile.avatar }
}
