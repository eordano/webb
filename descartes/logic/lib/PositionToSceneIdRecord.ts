import { StringPosition } from 'dcl/kernel/scene-atlas/01-user-position/types'
import { SceneIdString } from 'dcl/kernel/scene-atlas/04-sceneId-resolution/types'

export type PositionToSceneIdRecord = Record<StringPosition, SceneIdString>
