import { Message } from 'google-protobuf'
import { IBrokerConnection } from '../brokers/IBrokerConnection'
import { sendReliableMessage } from './sendReliableMessage'
import { sendUnreliableMessage } from './sendUnreliableMessage'

export function sendMessage(connection: IBrokerConnection, reliable: boolean, topicMessage: Message) {
  return reliable ? sendReliableMessage(connection, topicMessage) : sendUnreliableMessage(connection, topicMessage)
}
