import { HemisphericLight, ReflectionProbe, Scene } from '@babylonjs/core'
import { ambientConfigurations } from './ambientConfigurations'

export function configureLights(scene: Scene) {
  lights.hemiLight = new HemisphericLight('default light', ambientConfigurations.sunPosition, scene)
  lights.probe = new ReflectionProbe('skyReflection', 512, scene, true, true)
}

export const lights: {
  probe?: ReflectionProbe
  hemiLight?: HemisphericLight
} = {}
