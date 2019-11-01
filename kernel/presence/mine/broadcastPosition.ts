import { encodeParcelPosition, Vector2 } from 'dcl/utils'
import { delay, put, select } from 'redux-saga/effects'
import { protocolOutPosition, protocolOutProfile } from '../../comms/actions'
import { topicForParcel } from '../../comms/senders/topicNames'
import { getMyCurrentUserProfile } from '../../passports/selectors'
import { getCurrentGridPosition, getCurrentWorldPosition } from '../../scene-atlas/02-parcel-sight/selectors'
import { getBaseParcel } from '../../scene-atlas/05-sceneManifest-resolution/selectors'
import { getCurrentBaseParcels } from './getCurrentBaseParcels'

export const PROFILE_UPDATE_PERIOD = 2000

export const POSITION_UPDATE_PERIOD = 150

export function* broadcastProfile(): any {
  while (true) {
    const currentUser = (yield select(getMyCurrentUserProfile)) as ReturnType<typeof getMyCurrentUserProfile>
    const currentBaseParcels = yield select(getCurrentBaseParcels)

    const myPosition = (yield select(getCurrentWorldPosition)) as ReturnType<typeof getCurrentWorldPosition>
    const myParcel = (yield select(getCurrentGridPosition)) as ReturnType<typeof getCurrentGridPosition>
    const currentParcel = (yield select(getBaseParcel, encodeParcelPosition(myParcel))) as ReturnType<
      typeof getBaseParcel
    >
    yield put(protocolOutPosition(myPosition, topicForParcel(encodeParcelPosition(currentParcel as Vector2))))
    yield put(protocolOutProfile(currentUser.userId, currentUser.version, currentBaseParcels.map(topicForParcel)))

    yield delay(PROFILE_UPDATE_PERIOD)
  }
}

export function* broadcastPosition(): any {
  while (true) {
    const myPosition = (yield select(getCurrentWorldPosition)) as ReturnType<typeof getCurrentWorldPosition>

    yield put(protocolOutPosition(myPosition))
    yield delay(POSITION_UPDATE_PERIOD)
  }
}
