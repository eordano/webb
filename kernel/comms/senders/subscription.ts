import { MessageType, Format} from 'dcl/protos/broker_pb'
import { SubscriptionMessage } from 'dcl/protos/broker_pb'
import { IBrokerConnection } from '../brokers/IBrokerConnection'
import { sendMessage } from './sendMessage'
import { Buffer } from 'buffer'

export function sendSubscriptionUpdate(comms: IBrokerConnection, reliable: boolean, rawTopics: string[]) {
  const subscriptionMessage = new SubscriptionMessage()
  subscriptionMessage.setType(MessageType.SUBSCRIPTION)
  subscriptionMessage.setFormat(Format.PLAIN)
  subscriptionMessage.setTopics(new Uint8Array(Buffer.from(rawTopics.join(' '), 'utf8')))
  return sendMessage(comms, reliable, subscriptionMessage)
}
