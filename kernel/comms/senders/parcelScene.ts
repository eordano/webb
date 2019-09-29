import { ChatData, Category } from '@dcl/protos'

import { sendTopicMessage } from './topic'
import { IBrokerConnection } from '../brokers/IBrokerConnection'

export function sendParcelSceneMessage(comms: IBrokerConnection, sceneId: string, message: string) {
  const topic = sceneId

  const d = new ChatData()
  d.setCategory(Category.SCENE_MESSAGE)
  d.setTime(Date.now())
  d.setMessageId(sceneId)
  d.setText(message)

  return sendTopicMessage(comms, true, topic, d)
}
