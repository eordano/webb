import { DEBUG, ENGINE_DEBUG_PANEL, SCENE_DEBUG_PANEL } from 'dcl/config'
import { defaultLogger } from 'dcl/utils'
import { unityInterface } from './outgoing'

export const UnityGlobals = {
  gameInstance: {} as any,
  unityInterface: {} as any,
  browserInterface: {} as any
}

export async function initializeEngine(_gameInstance: any) {
  ;(window as any).gameInstance = UnityGlobals.gameInstance = _gameInstance
  ;(window as any).unityInterface = UnityGlobals.unityInterface = unityInterface

  UnityGlobals.unityInterface.SetPosition(0, 0, 2)
  // UnityGlobals.unityInterface.DeactivateRendering()
  UnityGlobals.unityInterface.ActivateRendering()

  if (DEBUG) {
    UnityGlobals.unityInterface.SetDebug()
  }

  if (SCENE_DEBUG_PANEL) {
    UnityGlobals.unityInterface.SetSceneDebugPanel()
  }

  if (ENGINE_DEBUG_PANEL) {
    UnityGlobals.unityInterface.SetEngineDebugPanel()
  }

  return {
    unityInterface: UnityGlobals.unityInterface,
    onMessage(type: string, message: any) {
      if (type in UnityGlobals.browserInterface) {
        // tslint:disable-next-line:semicolon
        ;(UnityGlobals.browserInterface as any)[type](message)
      } else {
        defaultLogger.info(`Unknown message (did you forget to add ${type} to unity-interface/dcl.ts?)`, message)
      }
    }
  }
}
