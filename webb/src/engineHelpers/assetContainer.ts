import { AbstractMesh, AssetContainer, Material, Mesh, PBRMaterial, Texture } from '@babylonjs/core'
import { lights } from './ambientLights'
import { processColliders } from './processModels'

export function processGLTFAssetContainer(assetContainer: AssetContainer) {
  assetContainer.meshes.forEach(mesh => {
    if (mesh instanceof Mesh) {
      if (mesh.geometry && !assetContainer.geometries.includes(mesh.geometry)) {
        assetContainer.geometries.push(mesh.geometry)
      }
    }
    mesh.subMeshes &&
      mesh.subMeshes.forEach(subMesh => {
        const mesh = subMesh.getMesh()
        if (mesh instanceof Mesh) {
          if (mesh.geometry && !assetContainer.geometries.includes(mesh.geometry)) {
            assetContainer.geometries.push(mesh.geometry)
          }
        }
      })
  })

  processColliders(assetContainer)

  // Find all the materials from all the meshes and add to $.materials
  assetContainer.meshes.forEach(mesh => {
    mesh.cullingStrategy = AbstractMesh.CULLINGSTRATEGY_BOUNDINGSPHERE_ONLY
    if (mesh.material) {
      if (!assetContainer.materials.includes(mesh.material)) {
        assetContainer.materials.push(mesh.material)
      }
    }
  })

  const { probe } = lights

  // Find the textures in the materials that share the same domain as the context
  // then add the textures to the $.textures
  assetContainer.materials.forEach((material: Material | PBRMaterial) => {
    for (let i in material) {
      const t = (material as any)[i]

      if (i.endsWith('Texture') && t instanceof Texture && t !== probe.cubeTexture) {
        if (!assetContainer.textures.includes(t)) {
          // if (isSceneTexture(t)) {
          assetContainer.textures.push(t)
          // }
        }
      }
    }

    if ('reflectionTexture' in material) {
      material.reflectionTexture = probe.cubeTexture
    }

    if ('albedoTexture' in material) {
      if (material.alphaMode === 2) {
        if (material.albedoTexture) {
          material.albedoTexture.hasAlpha = true
          material.useAlphaFromAlbedoTexture = true
        }
      }
    }
  })

  for (let ag of assetContainer.animationGroups) {
    ag.stop()
    for (let animatable of ag.animatables) {
      animatable.weight = 0
    }
  }

  assetContainer.addAllToScene()
}
