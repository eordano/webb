import { Category, ProfileData } from '@dcl/protos'
import { Vector3 } from '@dcl/utils'
import { getTopicForPosition } from '../../presence/mine/getTopicForPosition'
import { IBrokerConnection } from '../brokers/IBrokerConnection'
import { sendTopicIdentityMessage } from './topicIdentity'

export function sendProfileMessage(comms: IBrokerConnection, currentPosition: Vector3, profileVersion: number) {
  const d = new ProfileData()
  d.setCategory(Category.PROFILE)
  d.setTime(Date.now())
  if (profileVersion !== undefined && profileVersion !== null) {
    d.setProfileVersion('' + profileVersion)
  }
  const topic = getTopicForPosition(currentPosition)

  return sendTopicIdentityMessage(comms, true, topic, d)
}
