import { AvatarMessageType } from './AvatarMessageType'
import { Pose } from './Pose'
import { Profile } from '../../passports/types'

export type ReceiveUserDataMessage = {
  type: AvatarMessageType.USER_DATA
  uuid: string
  data: Partial<Profile>
}

export type ReceiveUserVisibleMessage = {
  type: AvatarMessageType.USER_VISIBLE
  uuid: string
  visible: boolean
}

export type ReceiveUserPoseMessage = {
  type: AvatarMessageType.USER_POSE
  uuid: string
  pose: Pose
}

export type UserRemovedMessage = {
  type: AvatarMessageType.USER_REMOVED
  uuid: string
}
