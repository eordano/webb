import {
  SceneIdToSceneManifestState,
  SceneByIdAction,
  SCENE_BY_ID_REQUEST,
  SCENE_BY_ID_SUCCESS,
  SCENE_BY_ID_FAILURE,
} from './types'

export const INITIAL_SCENEID_TO_MANIFEST_STATE: SceneIdToSceneManifestState = {
  scenesById: {},
  loading: {},
  errors: {}
}

export function sceneIdToSceneManifestReducer(
  state?: SceneIdToSceneManifestState,
  action?: SceneByIdAction
): SceneIdToSceneManifestState {
  if (!state) {
    return INITIAL_SCENEID_TO_MANIFEST_STATE
  }
  if (!action) {
    return state
  }
  switch (action.type) {
    case SCENE_BY_ID_REQUEST:
      return { ...state, loading: { ...state.loading, [action.payload.sceneId]: true } }
    case SCENE_BY_ID_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, [action.payload.sceneId]: undefined },
        scenesById: { ...state.scenesById, [action.payload.sceneId]: action.payload.scene }
      }
    case SCENE_BY_ID_FAILURE:
      return {
        ...state,
        loading: { ...state.loading, [action.payload.sceneId]: undefined },
        errors: { ...state.scenesById, [action.payload.sceneId]: action.payload.error }
      }
    default:
      return state
  }
}
