import { RENDERER_INITIALIZED } from 'dcl/kernel/renderer/types'
import { rendererSentLoaded } from 'dcl/kernel/scene-atlas/06-scripts/actions'
import { defaultLogger, playerConfigurations, ReadOnlyQuaternion, Vector3 } from 'dcl/utils'
import { store } from '../store'
import { UnityGlobals } from "./UnityGlobals"
import { positionEvent, reusableVector2, rendererPositionReport } from './incoming'
export const exposedInterface = {
  /** Triggered when the camera moves */
  ReportPosition(data: {
    position: Vector3;
    rotation: ReadOnlyQuaternion;
    playerHeight?: number;
  }) {
    positionEvent.position.set(data.position.x, data.position.y, data.position.z);
    positionEvent.quaternion.set(data.rotation.x, data.rotation.y, data.rotation.z, data.rotation.w);
    positionEvent.rotation.copyFrom(positionEvent.quaternion.eulerAngles);
    positionEvent.playerHeight = data.playerHeight || playerConfigurations.height;
    const { x, y } = reusableVector2;
    const positionReport = rendererPositionReport(positionEvent);
    if (positionReport.payload.x !== x || positionReport.payload.y !== y) {
      store.dispatch(positionReport);
    }
  },
  SceneEvent(data: {
    sceneId: string;
    eventType: string;
    payload: any;
  }) {
    console.log('Scene event', data);
    //const { sceneId, eventType } = data
    //const scene = sceneManager.getSceneWorkerBySceneID(data.sceneId)
    //if (scene) {
    //  const parcelScene = (scene as any).parcelScene as UnityRendererParcelSceneAPI
    //  parcelScene.emit(data.eventType as any, data.payload)
    //} else {
    //  defaultLogger.warn(`Renderer sent message ${eventType} to ${sceneId} but the scene is not loaded`)
    //}
  },
  OpenWebURL(data: {
    url: string;
  }) {
    window.open(data.url, '_blank');
  },
  ControlEvent({ eventType, payload }: {
    eventType: string;
    payload: any;
  }) {
    switch (eventType) {
      case 'SceneReady': {
        const { sceneId } = payload;
        store.dispatch(rendererSentLoaded(sceneId));
        break;
      }
      case 'ActivateRenderingACK': {
        store.dispatch({ type: RENDERER_INITIALIZED });
        break;
      }
      default: {
        defaultLogger.warn(`Unknown event type ${eventType}, ignoring`);
        break;
      }
    }
  }
}
UnityGlobals.browserInterface = exposedInterface
