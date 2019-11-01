import { parcelLimits, Vector3 } from 'dcl/utils'
import { delay, put, select } from 'redux-saga/effects'
import { ProtocolProfileAction, protocolSubscription, protocolUnsubscribe } from '../../comms/actions'
import { getSubscriptions, isConnected, isSubscribedToTopic } from '../../comms/selectors'
import { isAliasTopic, topicForAlias, topicToAlias } from '../../comms/senders/topicNames'
import { getCurrentWorldPosition } from '../../scene-atlas/02-parcel-sight/selectors'
import { getAllPresencesByAlias, getPresenceByAlias } from '../selectors'

export const UNSUBSCRIBE_PERIOD = 6000

export function* subscribeToPeers(action: ProtocolProfileAction): any {
  const topic = topicForAlias(action.payload.alias)
  const commsActive = yield select(isConnected)
  if (commsActive) {
    const isSubscribed = yield select(isSubscribedToTopic, topic)
    if (!isSubscribed) {
      const presence = (yield select(getPresenceByAlias, action.payload.alias)) as ReturnType<typeof getPresenceByAlias>
      if (presence.hasPosition) {
        const myPosition = (yield select(getCurrentWorldPosition)) as ReturnType<typeof getCurrentWorldPosition>
        if (!distanceTooFar(myPosition.position, presence.position)) {
          yield put(protocolSubscription(topic))
        }
      } else {
        yield put(protocolSubscription(topic))
      }
    }
  }
}

const MAXIMUM_SQUARED_DISTANCE = square(parcelLimits.parcelSize * 3) * 2

function square(a: number) {
  return a * a
}
function distanceTooFar(a: Vector3, b: Vector3) {
  return square(a.x - b.x) + square(a.z - b.z) > MAXIMUM_SQUARED_DISTANCE
}

export function* cleanFarAway(): any {
  while (true) {
    if (!(yield select(isConnected))) {
      break
    }
    const subscriptions = (yield select(getSubscriptions)) as ReturnType<typeof getSubscriptions>
    const aliasSubscriptions = subscriptions.filter(isAliasTopic)
    const myPosition = (yield select(getCurrentWorldPosition)) as ReturnType<typeof getCurrentWorldPosition>
    const peers = (yield select(getAllPresencesByAlias)) as ReturnType<typeof getAllPresencesByAlias>
    for (let topic of aliasSubscriptions) {
      const peer = peers[topicToAlias(topic)]
      if (peer.hasPosition) {
        if (distanceTooFar(myPosition.position, peer.position)) {
          yield put(protocolUnsubscribe(topic))
        }
      }
    }
    yield delay(UNSUBSCRIBE_PERIOD)
  }
}
