import { MessageHeader, MessageType, PingMessage, TopicFWMessage, TopicIdentityFWMessage } from 'dcl/protos/broker_pb'
import { Category, ChatData, DataHeader, PositionData, ProfileData } from 'dcl/protos/comms_pb'
import { protocolChat, protocolPing, protocolPosition, protocolProfile, protocolUnknown } from './actions'
import { BrokerMessage } from './brokers/IBrokerConnection'
import { logger } from './logger'

export function handleMessage(message: BrokerMessage): any {
  try {
    const msgType = MessageHeader.deserializeBinary(message.data).getType()
    let dataMessage, body, dataHeader, category
    switch (msgType) {
      case MessageType.UNKNOWN_MESSAGE_TYPE:
        this.logger.warn(`Unsupported message type: ${msgType}`)
        return protocolUnknown(msgType as any)
      case MessageType.TOPIC_FW:
        dataMessage = TopicFWMessage.deserializeBinary(message.data)
        body = dataMessage.getBody() as any
        dataHeader = DataHeader.deserializeBinary(body)
        category = dataHeader.getCategory()
        switch (category) {
          case Category.POSITION:
            let positionData = PositionData.deserializeBinary(body)
            return protocolPosition(positionData, dataMessage.getFromAlias())
          case Category.CHAT:
          case Category.SCENE_MESSAGE:
            let chatData = ChatData.deserializeBinary(body)
            return protocolChat(chatData, dataMessage.getFromAlias())
          default:
            return protocolUnknown(body)
        }
      case MessageType.TOPIC_IDENTITY_FW:
        dataMessage = TopicIdentityFWMessage.deserializeBinary(message.data)
        body = dataMessage.getBody() as any
        dataHeader = DataHeader.deserializeBinary(body)
        category = dataHeader.getCategory()
        const alias = dataMessage.getFromAlias().toString()
        const userId = atob(dataMessage.getIdentity_asB64())
        category = dataHeader.getCategory()
        switch (category) {
          case Category.PROFILE:
            const profileData = ProfileData.deserializeBinary(body)
            return protocolProfile(alias, userId, profileData)
        }
        break
      case MessageType.PING:
        const pingMessage = PingMessage.deserializeBinary(message.data)
        return protocolPing(pingMessage)
    }
  } catch (e) {
    logger.error('Protocol error:', e.message, e.stack)
    return
  }
}
