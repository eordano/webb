import { Color3, Vector3 } from '@babylonjs/core'

export namespace ambientConfigurations {
  // TODO: move this configurations inside EnvironmentHelper(options)
  export const groundColor = new Color3(0.1, 0.1, 0.1)
  export const sunColor = new Color3(1, 1, 1)
  export const sunPosition = new Vector3(-1, 0.01, 0.3).scaleInPlace(500)
  export const sunPositionColor = new Color3(sunPosition.x, sunPosition.y, sunPosition.z)

  export const RED = Color3.FromHexString('#ff004f')
  export const GREEN = Color3.FromHexString('#00e57a')
  export const BLUE = Color3.FromHexString('#00beff')
}
