import { getServerConfigurations } from '@dcl/config'
import { saveSnapshots } from './saveSnapshots'
import { ensureServerFormat } from '../transformations/profileToServerFormat'
import { Avatar } from '../types'
/**
 * @TODO (eordano, 16/Sep/2019): Upgrade the avatar schema on Profile Server
 */
export async function modifyAvatar(params: {
  url: string
  method: string
  currentVersion: number
  userId: string
  accessToken: string
  profile: {
    avatar: Avatar
    face: string
    body: string
  }
}) {
  const { url, method, currentVersion, profile, accessToken } = params
  const { face, avatar, body } = profile
  const snapshots = await saveSnapshots(
    getServerConfigurations().profile + '/profile/' + params.userId,
    accessToken,
    face,
    body
  )
  const avatarData: any = avatar
  avatarData.snapshots = snapshots
  const payload = JSON.stringify(ensureServerFormat(avatarData, currentVersion))
  const options = {
    method,
    body: payload,
    headers: {
      Authorization: 'Bearer ' + accessToken
    }
  }
  const response = await fetch(url, options)
  return response.json()
}
