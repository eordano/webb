import { put, select, takeLatest } from 'redux-saga/effects'
import { getCurrentUserId } from '../auth/selectors'
import { chatOtherUserYell } from '../chat/actions'
import { ProtocolChatAction, ProtocolProfileAction, protocolSubscription, PROTOCOL_CHAT, PROTOCOL_PROFILE } from '../comms/actions'
import { passportRequest } from '../passports/actions'
import { getProfile } from '../passports/selectors'
import { Profile } from '../passports/types'
import { SET_WORLD_POSITION } from '../scene-atlas/01-user-position/types'
import { allInSight } from '../scene-atlas/02-parcel-sight/selectors'
import { getSceneIdToBaseParcelMap } from '../scene-atlas/05-sceneManifest-resolution/selectors'
import { SETTLE_POSITION } from '../scene-atlas/07-settlement/types'
import { getPresenceByAlias } from './selectors'

export function* presenceSaga(): any {
  yield takeLatest(PROTOCOL_PROFILE, downloadPassportOnProtocolProfileMessage)
  yield takeLatest(PROTOCOL_CHAT, dispatchChatMessageToChatSubsystem)

  yield takeLatest(SETTLE_POSITION, subscribeToSceneTopicsBasedOnBaseParcel)
  yield takeLatest(SET_WORLD_POSITION, subscribeToSceneTopicsBasedOnBaseParcel)
}

function* downloadPassportOnProtocolProfileMessage(profile: ProtocolProfileAction) {
  const currentProfile = yield select(getProfile, profile.payload.userId)
  if (!currentProfile || (currentProfile as Profile).version < parseInt(profile.payload.profile.getProfileVersion(), 10)) {
    yield put(passportRequest(profile.payload.userId))
  }
}

function* dispatchChatMessageToChatSubsystem(chat: ProtocolChatAction) {
  const userId = (yield select(getPresenceByAlias, chat.payload.from)).userId
  yield put(chatOtherUserYell(userId, chat.payload.chatData.getText()))
}

function* subscribeToSceneTopicsBasedOnBaseParcel() {
  const currentUserId = yield select(getCurrentUserId)
  const sceneIdToBaseParcelMap = yield select(getSceneIdToBaseParcelMap)
  const currentlySighted = (yield select(allInSight)) as ReturnType<typeof allInSight>
  const currentBaseParcels = currentlySighted.map(_ => sceneIdToBaseParcelMap(_))
  return put(protocolSubscription('inbox-' + currentUserId + ' ' + currentBaseParcels.join(' ')))
}
