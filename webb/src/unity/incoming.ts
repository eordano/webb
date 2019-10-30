import { DEBUG_MESSAGES } from 'dcl/config'
import { RENDERER_INITIALIZED } from 'dcl/kernel/renderer/types'
import { SET_WORLD_POSITION } from 'dcl/kernel/scene-atlas/01-user-position/types'
import { rendererSentLoaded } from 'dcl/kernel/scene-atlas/06-scripts/actions'
import {
  defaultLogger,
  MQuaternion,
  MVector2,
  MVector3,
  playerConfigurations,
  ReadOnlyQuaternion,
  Vector3,
  worldToGrid
} from 'dcl/utils'
import future from 'fp-future'
import { store } from '../store'
import { initializeEngine, UnityGlobals } from './globals'
import { unityInterface } from './outgoing'

declare var UnityLoader: UnityLoaderType

const positionEvent = {
  position: MVector3.Zero(),
  quaternion: MQuaternion.Identity,
  rotation: MVector3.Zero(),
  playerHeight: playerConfigurations.height
}
const reusableVector2 = new MVector2()

function rendererPositionReport(positionEvent: any) {
  worldToGrid(positionEvent.position, reusableVector2)
  return {
    type: SET_WORLD_POSITION,
    payload: reusableVector2
  }
}

export const browserInterface = {
  /** Triggered when the camera moves */
  ReportPosition(data: { position: Vector3; rotation: ReadOnlyQuaternion; playerHeight?: number }) {
    positionEvent.position.set(data.position.x, data.position.y, data.position.z)
    positionEvent.quaternion.set(data.rotation.x, data.rotation.y, data.rotation.z, data.rotation.w)
    positionEvent.rotation.copyFrom(positionEvent.quaternion.eulerAngles)
    positionEvent.playerHeight = data.playerHeight || playerConfigurations.height
    const { x, y } = reusableVector2
    const positionReport = rendererPositionReport(positionEvent)
    if (positionReport.payload.x !== x || positionReport.payload.y !== y) {
      store.dispatch(positionReport)
    }
  },

  SceneEvent(data: { sceneId: string; eventType: string; payload: any }) {
    console.log('Scene event', data)
    //const { sceneId, eventType } = data
    //const scene = sceneManager.getSceneWorkerBySceneID(data.sceneId)
    //if (scene) {
    //  const parcelScene = (scene as any).parcelScene as UnityRendererParcelSceneAPI
    //  parcelScene.emit(data.eventType as any, data.payload)
    //} else {
    //  defaultLogger.warn(`Renderer sent message ${eventType} to ${sceneId} but the scene is not loaded`)
    //}
  },

  OpenWebURL(data: { url: string }) {
    window.open(data.url, '_blank')
  },

  ControlEvent({ eventType, payload }: { eventType: string; payload: any }) {
    switch (eventType) {
      case 'SceneReady': {
        const { sceneId } = payload
        store.dispatch(rendererSentLoaded(sceneId))
        break
      }
      case 'ActivateRenderingACK': {
        store.dispatch({ type: RENDERER_INITIALIZED })
        break
      }
      default: {
        defaultLogger.warn(`Unknown event type ${eventType}, ignoring`)
        break
      }
    }
  }
}

UnityGlobals.browserInterface = browserInterface

type UnityLoaderType = {
  // https://docs.unity3d.com/Manual/webgl-templates.html
  instantiate(divId: string | HTMLElement, manifest: string): UnityGame
}

type UnityGame = {
  SendMessage(object: string, method: string, args: number | string): void
  SetFullscreen(): void
}

/**
 * InstancedJS is the local instance of Decentraland
 */
let _instancedJS: ReturnType<typeof initializeEngine> | undefined = undefined

/**
 * HTML Container where everything happens
 */
let _container: HTMLElement | null = null

/**
 * UnityGame instance (Either Unity WebGL or Or Unity editor via WebSocket)
 */
let _gameInstance: UnityGame | null = null

export type InitializeUnityResult = {
  engine: UnityGame
  container: HTMLElement
  instancedJS: ReturnType<typeof initializeEngine>
}

const engineInitialized = future()

/** Initialize the engine in a container */
export async function initializeUnity(container: HTMLElement): Promise<InitializeUnityResult> {
  _container = container

  const qs = new URLSearchParams(document.location.search)

  if (qs.get('ws')) {
    _gameInstance = await initializeUnityEditor(qs.get('ws'), container)
  } else {
    _gameInstance = await UnityLoader.instantiate(container, 'static/unity/Build/unity.json')
  }

  await engineInitialized

  return {
    engine: _gameInstance!,
    container,
    instancedJS: _instancedJS!
  }
}

const DCL = {
  // This function get's called by the engine
  EngineStarted: () => {
    if (!_gameInstance) {
      throw new Error('There is no UnityGame')
    }

    ;(window as any).unityInterface = unityInterface
    _instancedJS = initializeEngine(_gameInstance!)

    _instancedJS
      .then($ => {
        engineInitialized.resolve($)
      })
      .catch(error => {
        engineInitialized.reject(error)
        _container!.classList.remove('dcl-loading')
        _container!.innerHTML = `<h3>${error.message}</h3>`
      })
  },

  MessageFromEngine: (type: string, jsonEncodedMessage: string) => {
    if (_instancedJS !== undefined) {
      _instancedJS.then($ => {
        try {
          $.onMessage(type, JSON.parse(jsonEncodedMessage))
        } catch (e) {
          console.log(e)
        }
      } )
    } else {
      // defaultLogger.error('Message received without initializing engine', type, jsonEncodedMessage)
      setTimeout(() => unityInterface.ActivateRendering(), 3000)
    }
  }
}

// The namespace DCL is exposed to global because the unity template uses it to
// send the messages
window['DCL'] = DCL

/** This connects the local game to a native client via WebSocket */
function initializeUnityEditor(webSocketUrl: string, container: HTMLElement): UnityGame {
  defaultLogger.info(`Connecting WS to ${webSocketUrl}`)
  container.innerHTML = `<h3>Connecting...</h3>`
  const ws = new WebSocket(webSocketUrl)

  ws.onclose = function(e) {
    defaultLogger.error('WS closed!', e)
    container.innerHTML = `<h3 style='color:red'>Disconnected</h3>`
  }

  ws.onerror = function(e) {
    defaultLogger.error('WS error!', e)
    container.innerHTML = `<h3 style='color:red'>EERRORR</h3>`
  }

  ws.onmessage = function(ev) {
    if (DEBUG_MESSAGES) {
      defaultLogger.info('>>>', ev.data)
    }

    try {
      const m = JSON.parse(ev.data)
      if (m.type && m.payload) {
        const payload = JSON.parse(m.payload)
        _instancedJS!.then($ => $.onMessage(m.type, payload))
      } else {
        defaultLogger.error('Dont know what to do with ', m)
      }
    } catch (e) {
      defaultLogger.error(e)
    }
  }

  const gameInstance: UnityGame = {
    SendMessage(_obj, type, payload) {
      if (ws.readyState === ws.OPEN) {
        const msg = JSON.stringify({ type, payload })
        ws.send(msg)
      }
    },
    SetFullscreen() {
      // stub
    }
  }

  ws.onopen = function() {
    container.classList.remove('dcl-loading')
    defaultLogger.info('WS open!')
    gameInstance.SendMessage('', 'Reset', '')
    container.innerHTML = `<h3  style='color:green'>Connected</h3>`
    DCL.EngineStarted()
  }

  return gameInstance
}
