import { stringArrayToBooleanMap } from 'dcl/utils'
import { put, select } from 'redux-saga/effects'
import { protocolSubscription, protocolUnsubscribe } from '../../comms/actions'
import { getSubscriptions } from '../../comms/selectors'
import { getCurrentBaseParcels } from './getCurrentBaseParcels'
import { isParcelTopic, topicForParcel } from '../../comms/senders/topicNames'

export function* updateSceneSubscriptions(): any {
  const currentBaseParcels = yield select(getCurrentBaseParcels)
  const currentSubscriptions = (yield select(getSubscriptions)) as ReturnType<typeof getSubscriptions>

  const currentSubscriptionDict = stringArrayToBooleanMap(currentSubscriptions)
  for (let baseParcel of currentBaseParcels) {
    if (!currentSubscriptionDict[baseParcel]) {
      yield put(protocolSubscription(topicForParcel(baseParcel)))
    }
  }
  const currentBaseParcelsMap = stringArrayToBooleanMap(currentBaseParcels.map(topicForParcel))
  for (let topic of currentSubscriptions) {
    if (isParcelTopic(topic) && !currentBaseParcelsMap[topic]) {
      yield put(protocolUnsubscribe(topic))
    }
  }
}
