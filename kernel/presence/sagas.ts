import { fork, takeLatest } from 'redux-saga/effects'
import { PARCEL_SIGHT_DELTA } from '../scene-atlas/02-parcel-sight/actions'
import { SCENE_BY_ID_SUCCESS } from '../scene-atlas/05-sceneManifest-resolution/types'
import { updateSceneSubscriptions } from './mine/updateSceneSubscriptions'
import { cleanFarAway } from './peers/subscribeToPeers'

export function* presenceSaga(): any {
  yield takeLatest(PARCEL_SIGHT_DELTA, updateSceneSubscriptions)
  yield takeLatest(SCENE_BY_ID_SUCCESS, updateSceneSubscriptions)

  yield fork(cleanFarAway)
}
