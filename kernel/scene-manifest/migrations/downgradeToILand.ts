import { ILand, ISceneManifest, encodeParcelPosition } from 'dcl/utils'

export function downgradeToILand(
  scene: ISceneManifest
): ILand<{ main: string; scene: { parcels: string[]; base: string }; communications: any }> {
  return {
    sceneId: scene.id,
    baseUrl: '',
    scene: {
      main: scene.main,
      scene: { parcels: scene.parcels.map(encodeParcelPosition), base: encodeParcelPosition(scene.baseParcel) },
      communications: ''
    },
    mappingsResponse: {
      parcel_id: scene.id,
      root_cid: scene.id,
      publisher: '',
      contents: scene.assets.map(asset => ({
        file: asset.name,
        hash: ''
      }))
    }
  }
}
