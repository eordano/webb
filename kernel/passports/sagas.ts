import { defaultLogger } from 'dcl/utils'
import { call, put, select, take, takeLatest } from 'redux-saga/effects'
import { isInitialized } from '../renderer/selectors'
import { RENDERER_INITIALIZED } from '../renderer/types'
import {
  addCatalog,
  AddCatalogAction,
  ADD_CATALOG,
  CATALOGS_REQUEST,
  InventoryRequest,
  INVENTORY_REQUEST,
  PassportRandomAction,
  PassportRequestAction,
  PassportSuccessAction,
  PASSPORT_RANDOM,
  PASSPORT_REQUEST,
  PASSPORT_SUCCESS,
  SaveAvatarRequest,
  SAVE_AVATAR_REQUEST
} from './actions'
import { fetchCatalog } from './requests/fetchCatalog'
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

  yield takeLatest(CATALOGS_REQUEST, loadCatalogs)

  yield takeLatest(ADD_CATALOG, handleAddCatalog)

  yield takeLatest(PASSPORT_REQUEST, handleFetchProfile)
  yield takeLatest(PASSPORT_SUCCESS, submitPassportToRenderer)
  yield takeLatest(PASSPORT_RANDOM, handleRandomAsSuccess)

  yield takeLatest(SAVE_AVATAR_REQUEST, handleSaveAvatar)

  yield takeLatest(INVENTORY_REQUEST, handleFetchInventory)
}

export function* initialLoad(): any {
  if (!(yield select(isInitialized))) {
    yield take(RENDERER_INITIALIZED)
  }
}

export function* loadCatalogs(): any {
  try {
    const baseAvatars = yield call(fetchCatalog, 'https://dcl-base-avatars.now.sh/expected.json')
    const baseExclusive = yield call(fetchCatalog, 'https://dcl-base-exclusive.now.sh/expected.json')

    yield put(addCatalog('base-avatars', baseAvatars))
    yield put(addCatalog('base-exclusive', baseExclusive))
  } catch (error) {
    defaultLogger.error('[FATAL]: Could not load catalog!', error)
  }
}

export function* handleFetchProfile(action: PassportRequestAction): any {}

export function* handleRandomAsSuccess(action: PassportRandomAction): any {}

export function* handleAddCatalog(action: AddCatalogAction): any {}

export function* submitPassportToRenderer(action: PassportSuccessAction): any {}

export function* sendLoadProfile(profile: Profile): any {}

export function* handleFetchInventory(action: InventoryRequest): any {}

export function* handleSaveAvatar(saveAvatar: SaveAvatarRequest): any {}
