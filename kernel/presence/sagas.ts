import { put, select, takeLatest, fork } from 'redux-saga/effects'
import { chatOtherUserYell } from '../chat/actions'
import { ProtocolChatAction, ProtocolProfileAction, PROTOCOL_CHAT, PROTOCOL_PROFILE } from '../comms/actions'
import { passportRequest } from '../passports/actions'
import { getProfile } from '../passports/selectors'
import { Profile } from '../passports/types'
import { PARCEL_SIGHT_DELTA } from '../scene-atlas/02-parcel-sight/actions'
import { SCENE_BY_ID_SUCCESS } from '../scene-atlas/05-sceneManifest-resolution/types'
import { updateSceneSubscriptions } from './mine/updateSceneSubscriptions'
import { cleanFarAway, subscribeToPeers } from './peers/subscribeToPeers'
import { getPresenceByAlias } from './selectors'

export function* presenceSaga(): any {
  yield takeLatest(PROTOCOL_PROFILE, downloadPassportOnProtocolProfileMessage)
  yield takeLatest(PROTOCOL_PROFILE, subscribeToPeers)
  yield takeLatest(PROTOCOL_CHAT, dispatchChatMessageToChatSubsystem)

  yield takeLatest(PARCEL_SIGHT_DELTA, updateSceneSubscriptions)
  yield takeLatest(SCENE_BY_ID_SUCCESS, updateSceneSubscriptions)

  yield fork(cleanFarAway)
}

function* downloadPassportOnProtocolProfileMessage(profile: ProtocolProfileAction) {
  const currentProfile = yield select(getProfile, profile.payload.userId)
  if (
    !currentProfile ||
    (currentProfile as Profile).version < parseInt(profile.payload.profile.getProfileVersion(), 10)
  ) {
    yield put(passportRequest(profile.payload.userId))
  }
}

function* dispatchChatMessageToChatSubsystem(chat: ProtocolChatAction) {
  const user = (yield select(getPresenceByAlias, chat.payload.from)) as ReturnType<typeof getPresenceByAlias>
  if (user.hasData) {
    const passport = (yield select(getProfile, user.userId)) as ReturnType<typeof getProfile>
    yield put(chatOtherUserYell(passport.name, chat.payload.chatData.getText()))
  }
}
