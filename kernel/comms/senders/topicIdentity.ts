import { MessageType, TopicIdentityMessage } from 'dcl/protos/broker_pb'
import { Message } from 'google-protobuf'
import { IBrokerConnection } from '../brokers/IBrokerConnection'
import { sendMessage } from './sendMessage'

export function sendTopicIdentityMessage(comms: IBrokerConnection, reliable: boolean, topic: string, body: Message) {
  const encodedBody = body.serializeBinary()

  const message = new TopicIdentityMessage()
  message.setType(MessageType.TOPIC_IDENTITY)
  message.setTopic(topic)
  message.setBody(encodedBody)

  return sendMessage(comms, reliable, message)
}
