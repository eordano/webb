import { configureStore } from 'dcl/kernel/core/store'
import { SCENE_RUNNING } from 'dcl/kernel/scene-atlas/06-scripts/actions'
import { syncedObjects } from './StoreSyncedECS'

export const configured: any = configureStore({
    scenes: function(state: any, action: any) {
        if (!action) {
            return state
        }
        switch (action.type) {
            case SCENE_RUNNING:
                return { ...state, [action.payload.sceneId]: syncedObjects.systems[action.payload.sceneId] }
        }
        return state || {}
    }
})
export const store = configured.store
