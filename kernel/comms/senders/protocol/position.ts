import { Category, PositionData } from '@dcl/protos/comms_pb'

import { Pose } from '../../types/Pose'
import { sendTopicMessage } from '../topic'
import { IBrokerConnection } from '../../brokers/IBrokerConnection'

export function sendPosition(comms: IBrokerConnection, topic: string, p: Pose) {
  const d = new PositionData()
  d.setCategory(Category.POSITION)
  d.setTime(Date.now())
  d.setPositionX(p[0])
  d.setPositionY(p[1])
  d.setPositionZ(p[2])
  d.setRotationX(p[3])
  d.setRotationY(p[4])
  d.setRotationZ(p[5])
  d.setRotationW(p[6])

  const unreliable = false
  return sendTopicMessage(comms, unreliable, topic, d)
}
