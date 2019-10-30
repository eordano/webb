import { getServerConfigurations } from 'dcl/config'
import { defaultLogger } from 'dcl/utils'
import { call, put, race, select, take, takeLatest } from 'redux-saga/effects'
import { getAccessToken, getCurrentUserId, getEmail } from '../auth/selectors'
import { isInitialized } from '../renderer/selectors'
import { RENDERER_INITIALIZED } from '../renderer/types'
import {
  addCatalog,
  AddCatalogAction,
  ADD_CATALOG,
  catalogLoaded,
  CATALOG_LOADED,
  inventoryFailure,
  InventoryRequest,
  inventoryRequest,
  inventorySuccess,
  InventorySuccess,
  INVENTORY_FAILURE,
  INVENTORY_REQUEST,
  INVENTORY_SUCCESS,
  passportRandom,
  PassportRandomAction,
  passportRequest,
  PassportRequestAction,
  passportSuccess,
  PassportSuccessAction,
  PASSPORT_RANDOM,
  PASSPORT_REQUEST,
  PASSPORT_SUCCESS,
  saveAvatarFailure,
  SaveAvatarRequest,
  saveAvatarSuccess,
  SAVE_AVATAR_REQUEST
} from './actions'
import { sendLoadProfileToRenderer } from './renderer/sendLoadProfileToRenderer'
import { sendWearablesCatalog } from './renderer/sendWearablesCatalog'
import { fetchCatalog } from './requests/fetchCatalog'
import { fetchInventoryItemsByAddress } from './requests/fetchInventoryItemsByAddress'
import { fetchProfileFromServer } from './requests/fetchProfileFromServer'
import { generateRandomUserProfile } from './requests/generateRandomUserProfile'
import { modifyAvatar } from './requests/modifyAvatar'
import { baseCatalogsLoaded, getProfile, getProfileDownloadServer } from './selectors'
import { processServerProfile } from './transformations/processServerProfile'
import { profileToRendererFormat } from './transformations/profileToRendererFormat'
import { Profile } from './types'

/**
 * This saga handles both passports and assets required for the renderer to show the
 * users' inventory and avatar editor.
 *
 * When the renderer is initialized, it will fetch the asset catalog and submit it to the renderer.
 *
 * Whenever a passport is requested, it will fetch it and store it locally (see also: `selectors.ts`)
 *
 * If a user avatar was not found, it will create a random passport (see: `handleRandomAsSuccess`)
 *
 * Lastly, we handle save requests by submitting both to the avatar legacy server as well as to the profile server.
 *
 * It's *very* important for the renderer to never receive a passport with items that have not been loaded into the catalog.
 */
export function* passportSaga(): any {
  yield takeLatest(RENDERER_INITIALIZED, initialLoad)

  yield takeLatest(ADD_CATALOG, handleAddCatalog)

  yield takeLatest(PASSPORT_REQUEST, handleFetchProfile)
  yield takeLatest(PASSPORT_SUCCESS, submitPassportToRenderer)
  yield takeLatest(PASSPORT_RANDOM, handleRandomAsSuccess)

  yield takeLatest(SAVE_AVATAR_REQUEST, handleSaveAvatar)

  yield takeLatest(INVENTORY_REQUEST, handleFetchInventory)
}

export function* initialLoad(): any {
  try {
    const baseAvatars = yield call(fetchCatalog, 'https://dcl-base-avatars.now.sh/expected.json')
    const baseExclusive = yield call(fetchCatalog, 'https://dcl-base-exclusive.now.sh/expected.json')
    if (!(yield select(isInitialized))) {
      yield take(RENDERER_INITIALIZED)
    }
    yield put(addCatalog('base-avatars', baseAvatars))
    yield put(addCatalog('base-exclusive', baseExclusive))
  } catch (error) {
    defaultLogger.error('[FATAL]: Could not load catalog!', error)
  }
}

export function* handleFetchProfile(action: PassportRequestAction): any {
  const userId = action.payload.userId
  try {
    const serverUrl = yield select(getProfileDownloadServer)
    const accessToken = yield select(getAccessToken)
    const profile = yield call(fetchProfileFromServer, serverUrl, userId, accessToken)
    const currentId = yield select(getCurrentUserId)
    if (currentId === userId) {
      profile.email = yield select(getEmail)
    }
    if (profile.ethAddress) {
      yield put(inventoryRequest(userId, profile.ethAddress))
      const inventoryResult = yield race({
        success: take(INVENTORY_SUCCESS),
        failure: take(INVENTORY_FAILURE)
      })
      if (inventoryResult.failure) {
        defaultLogger.error(`Unable to fetch inventory for ${userId}:`, inventoryResult.failure)
      } else {
        profile.inventory = (inventoryResult.success as InventorySuccess).payload.inventory.map(dropIndexFromExclusives)
      }
    } else {
      profile.inventory = []
    }
    const passport = processServerProfile(userId, profile)
    yield put(passportSuccess(userId, passport))
  } catch (error) {
    const randomizedUserProfile = yield call(generateRandomUserProfile, userId)
    const currentId = yield select(getCurrentUserId)
    if (currentId === userId) {
      randomizedUserProfile.email = yield select(getEmail)
    }
    yield put(inventorySuccess(userId, randomizedUserProfile.inventory))
    yield put(passportRandom(userId, randomizedUserProfile))
  }
}

export function* handleRandomAsSuccess(action: PassportRandomAction): any {
  // TODO (eordano, 16/Sep/2019): See if there's another way around people expecting PASSPORT_SUCCESS
  yield put(passportSuccess(action.payload.userId, action.payload.profile))
}

export function* handleAddCatalog(action: AddCatalogAction): any {
  // TODO (eordano, 16/Sep/2019): Validate correct schema
  if (!action.payload.catalog) {
    return
  }
  if (!(yield select(isInitialized))) {
    yield take(RENDERER_INITIALIZED)
  }
  yield call(sendWearablesCatalog, action.payload.catalog)
  yield put(catalogLoaded(action.payload.name))
}

export function* submitPassportToRenderer(action: PassportSuccessAction): any {
  if ((yield select(getCurrentUserId)) === action.payload.userId) {
    if (!(yield select(isInitialized))) {
      yield take(RENDERER_INITIALIZED)
    }
    while (!(yield select(baseCatalogsLoaded))) {
      yield take(CATALOG_LOADED)
    }
    yield call(sendLoadProfile, action.payload.profile)
  }
}

export function* sendLoadProfile(profile: Profile): any {
  while (!(yield select(baseCatalogsLoaded))) {
    yield take(CATALOG_LOADED)
  }
  yield call(sendLoadProfileToRenderer, profileToRendererFormat(profile))
}

export function* handleFetchInventory(action: InventoryRequest): any {
  const { userId, ethAddress } = action.payload
  try {
    const inventoryItems = yield call(fetchInventoryItemsByAddress, ethAddress)
    yield put(inventorySuccess(userId, inventoryItems))
  } catch (error) {
    yield put(inventoryFailure(userId, error))
  }
}

function dropIndexFromExclusives(exclusive: string) {
  return exclusive
    .split('/')
    .slice(0, 4)
    .join('/')
}

export function* handleSaveAvatar(saveAvatar: SaveAvatarRequest): any {
  const userId = saveAvatar.payload.userId ? saveAvatar.payload.userId : yield select(getCurrentUserId)
  try {
    const currentVersion = (yield select(getProfile, userId)).version || 0
    const accessToken = yield select(getAccessToken)
    const url = getServerConfigurations().profile + 'profile/' + userId + '/avatar'
    const result = yield call(modifyAvatar, {
      url,
      method: 'PUT',
      userId,
      currentVersion,
      accessToken,
      profile: saveAvatar.payload.profile
    })
    const { version } = result
    yield put(saveAvatarSuccess(userId, version))
    yield put(passportRequest(userId))
  } catch (error) {
    yield put(saveAvatarFailure(userId, 'unknown reason'))
  }
}
