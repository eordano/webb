import { PositionData } from 'dcl/protos/comms_pb'
import { PositionReport } from '../types/PositionReport'
import { playerConfigurations } from '@dcl/utils'

export function marshalPositionReport(positionReport: PositionReport): number[] {
  const p = positionReport.position
  const q = positionReport.rotation
  return [p.x, p.y, p.z, q.x, q.y, q.z, q.w]
}

export function unmarshalPositionReport(data: PositionData): PositionReport {
  const x = data.getPositionX()
  const y = data.getPositionY()
  const z = data.getPositionZ()
  const rx = data.getRotationX()
  const ry = data.getRotationY()
  const rz = data.getRotationZ()
  const rw = data.getRotationW()
  return {
    position: { x, y, z },
    playerHeight: playerConfigurations.height,
    rotation: { x: rx, y: ry, z: rz, w: rw }
  }
}
