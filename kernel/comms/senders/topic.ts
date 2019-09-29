import { MessageType, TopicMessage } from '@dcl/protos'
import { Message } from 'google-protobuf'
import { IBrokerConnection } from '../brokers/IBrokerConnection'
import { sendMessage } from './sendMessage'

export function sendTopicMessage(comms: IBrokerConnection, reliable: boolean, topic: string, body: Message) {
  const encodedBody = body.serializeBinary()

  const message = new TopicMessage()
  message.setType(MessageType.TOPIC)
  message.setTopic(topic)
  message.setBody(encodedBody)

  return sendMessage(comms, reliable, message)
}
