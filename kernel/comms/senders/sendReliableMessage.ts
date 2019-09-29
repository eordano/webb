import { Message } from 'google-protobuf'
import { IBrokerConnection } from '../brokers/IBrokerConnection'
import { logger } from '../sagas'

export function sendReliableMessage(connection: IBrokerConnection, msg: Message) {
  if (!connection.hasReliableChannel) {
    logger.error('trying to send a topic message using null reliable channel')
    return
  }
  const bytes = msg.serializeBinary()
  connection.sendReliable(bytes)
}
