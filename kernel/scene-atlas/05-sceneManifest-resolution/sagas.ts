import { defaultLogger, IScene, memoize, ParcelInfoResponse } from '@dcl/utils'
import { call, put, select, takeLatest, takeEvery } from 'redux-saga/effects'
import { getDownloadServer, isMappingResolved } from './selectors'
import { sceneByIdFailure, sceneByIdRequest, SceneByIdRequest, sceneByIdSuccess, SCENE_BY_ID_REQUEST } from './types'
import { SET_POSITION_AS_RESOLVED, SetPositionsAsResolvedAction } from '../04-sceneId-resolution/actions'
import { migrateFromILand } from '../../scene-manifest/migrations/migrateFromILand'

export function* sceneIdToManifestSaga(): any {
  yield takeLatest(SET_POSITION_AS_RESOLVED, fetchMissingSceneManifest)
  yield takeEvery(SCENE_BY_ID_REQUEST, handleFetchRequest)
}

export function* fetchMissingSceneManifest(resolvedPosition: SetPositionsAsResolvedAction): any {
  if (resolvedPosition.payload.sceneId) {
    yield put(sceneByIdRequest(resolvedPosition.payload.sceneId))
  }
}

export function* handleFetchRequest(action: SceneByIdRequest): any {
  const downloadServer = yield select(getDownloadServer)
  const { sceneId } = action.payload
  try {
    const hasData = yield select(isMappingResolved, sceneId)
    if (hasData) {
      return
    }
    const mapping = yield call(fetchManifestForSceneId, downloadServer, sceneId)
    if (!mapping) {
      yield put(sceneByIdFailure(sceneId, 'empty'))
    }
    const hasDataYet = yield select(isMappingResolved, sceneId)
    if (!hasDataYet) {
      yield put(sceneByIdSuccess(sceneId, mapping))
    }
  } catch (error) {
    defaultLogger.error(error)
    yield put(sceneByIdFailure(sceneId, error))
  }
}

export async function fetchManifestForSceneId(downloadServer: string, sceneId: string) {
  try {
    const actualResponse = await memoize(downloadServer + `/parcel_info?cids=${sceneId}`)(fetch)
    const mappings = actualResponse as {
      data: ParcelInfoResponse[]
    }
    const content = mappings.data[0]
    if (!content || !content.content || !content.content.contents) {
      // defaultLogger.info(`Resolved ${sceneId} to null -- no contents`, content)
      return null
    }
    const sceneJsonMapping = content.content.contents.find($ => $.file === 'scene.json')
    if (!sceneJsonMapping) {
      defaultLogger.info(`Resolved ${sceneId} to null -- no sceneJsonMapping`)
      return null
    }
    const baseUrl = downloadServer + '/contents/'
    const sceneData = (await memoize(baseUrl + sceneJsonMapping.hash)(fetch)) as IScene
    const scene = migrateFromILand(sceneData, mappings)
    scene.id = sceneId
    return scene
  } catch (error) {
    defaultLogger.error(`Error in ${downloadServer}/parcel_info response!`, error.stack)
    throw error
  }
}
