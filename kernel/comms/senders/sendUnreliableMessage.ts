import { Message } from 'google-protobuf'
import { IBrokerConnection } from '../brokers/IBrokerConnection'
import { logger } from '../sagas'

export function sendUnreliableMessage(connection: IBrokerConnection, msg: Message) {
  if (!connection.hasUnreliableChannel) {
    logger.error('trying to send a topic message using null unreliable channel')
    return
  }
  const bytes = msg.serializeBinary()
  connection.sendUnreliable(bytes)
}
