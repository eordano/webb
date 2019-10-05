import { Category, ProfileData } from '@dcl/protos'
import { IBrokerConnection } from '../../brokers/IBrokerConnection'
import { sendTopicIdentityMessage } from '../topicIdentity'

export function sendProfileMessage(comms: IBrokerConnection, topic: string, profileVersion: number) {
  const d = new ProfileData()
  d.setCategory(Category.PROFILE)
  d.setTime(Date.now())
  if (profileVersion !== undefined && profileVersion !== null) {
    d.setProfileVersion('' + profileVersion)
  }
  return sendTopicIdentityMessage(comms, true, topic, d)
}
