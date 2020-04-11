import { MVector3, MQuaternion } from 'dcl/utils'

/** @public */
export type TranformConstructorArgs = {
  position?: MVector3
  rotation?: MQuaternion
  scale?: MVector3
}

/**
 * @internal
 */
export enum CLASS_ID {
  TRANSFORM = 1,
  UUID_CALLBACK = 8,
  BOX_SHAPE = 16,
  SPHERE_SHAPE = 17,
  PLANE_SHAPE = 18,
  CONE_SHAPE = 19,
  CYLINDER_SHAPE = 20,
  TEXT_SHAPE = 21,

  NFT_SHAPE = 22,
  UI_WORLD_SPACE_SHAPE = 23,
  UI_SCREEN_SPACE_SHAPE = 24,
  UI_CONTAINER_RECT = 25,
  UI_CONTAINER_STACK = 26,
  UI_TEXT_SHAPE = 27,
  UI_INPUT_TEXT_SHAPE = 28,
  UI_IMAGE_SHAPE = 29,
  UI_SLIDER_SHAPE = 30,
  CIRCLE_SHAPE = 31,
  BILLBOARD = 32,

  ANIMATION = 33,

  UI_FULLSCREEN_SHAPE = 40, // internal fullscreen scenes
  UI_BUTTON_SHAPE = 41,

  GLTF_SHAPE = 54,
  OBJ_SHAPE = 55,
  AVATAR_SHAPE = 56,

  BASIC_MATERIAL = 64,
  PRB_MATERIAL = 65,

  HIGHLIGHT_ENTITY = 66,

  /** @deprecated */
  SOUND = 67,
  TEXTURE = 68,

  AUDIO_CLIP = 200,
  AUDIO_SOURCE = 201,
  GIZMOS = 203,
}
