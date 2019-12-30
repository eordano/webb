import { AbstractMesh, AssetContainer, Color3, Orientation, PBRMaterial, Scene, SceneLoader, StandardMaterial, Texture, TextureAssetTask } from '@babylonjs/core'
import { indexedCatalog } from 'dcl/collections/src/catalog/outputCatalog'
import { Avatar, Wearable } from 'dcl/kernel/passports/types'

export const categories = [
  'body_shape',
  'earring',
  'eyebrows',
  'eyes',
  'eyewear',
  'facial_hair',
  'feet',
  'hair',
  'lower_body',
  'mouth',
  'tiara',
  'upper_body',
  'helmet',
  'top_head',
  'mask'
]

const base = (_: string) => `dcl://base-avatars/${_}`
const MALE = base('BaseMale')
const FEMALE = base('BaseFemale')
const defaultWearableId = function(avatar: Avatar, category: string) {
  switch (category) {
    case 'body_shape':
      return FEMALE
    case 'eyebrows':
      return avatar.bodyShape === MALE ? base('eyebrows_00') : base('f_eyebrows_00')
    case 'mouth':
      return avatar.bodyShape === MALE ? base('mouth_00') : base('f_mouth_00')
    case 'eyes':
      return avatar.bodyShape === MALE ? base('eyes_00') : base('f_eyes_00')
    case 'facial_hair':
      return avatar.bodyShape === MALE ? base('full_beard') : null
    case 'hair':
      return avatar.bodyShape === MALE ? base('short_hair') : base('standard_hair')
    case 'upper_body':
      return avatar.bodyShape === MALE ? base('green_hoodie') : base('yellow_tshirt')
    case 'lower_body':
      return avatar.bodyShape === MALE ? base('confortablepants') : base('f_jeans')
  }
  return null
}

function getWearableByCategory(avatar: Avatar, category: string) {
  const oneElementArray = avatar.wearables.filter(_ =>
    indexedCatalog[_] ? (indexedCatalog[_].category === category ? indexedCatalog[_] : false) : false
  )
  if (!oneElementArray.length) {
    return defaultWearableId(avatar, category)
  }
  return oneElementArray[0]
}

function bodyShapeName(avatar: Avatar) {
  return avatar.bodyShape.split('/')[3]
}

function stripDclDomain(_: string) {
  return _.replace('dcl://', '')
}

function rootUrl(avatar: Avatar, wearable: Wearable) {
  return `http://localhost:1338/wearable/${bodyShapeName(avatar)}/${stripDclDomain(wearable.id)}/`
}

function getRepresentation(avatar: Avatar, wearable: Wearable) {
  return wearable.representations.find(_ => _.bodyShapes.includes(avatar.bodyShape))
}

function promisedMask(scene: Scene, avatar: Avatar, wearable: Wearable): Promise<Texture> {
  const name = wearable.id
  const representation = getRepresentation(avatar, wearable)
  const filename = representation.contents.find(_ => _.file.toLowerCase().endsWith('_mask.png'))
  if (filename) {
    return new Promise((resolve, reject) => {
      const task = new TextureAssetTask(name, rootUrl(avatar, wearable) + filename.file, true, false)
      task.onError = () => reject(task.errorObject)
      task.onSuccess = () => {
        resolve(task.texture)
      }
      task.run(scene, resolve, reject)
    })
  }
}

function promisedTexture(scene: Scene, name: string, url: string): Promise<Texture> {
  return new Promise((resolve, reject) => {
    const task = new TextureAssetTask(name, url, true, false)
    task.onError = () => reject(task.errorObject)
    task.onSuccess = () => {
      resolve(task.texture)
    }
    task.run(scene, resolve, reject)
  })
}

export function FullAvatar(props: { avatar: Avatar }): any {
  const { avatar } = props
  for (let wearable of avatar.wearables) {
    if (!indexedCatalog[wearable]) {
      console.log('Not found: ', wearable)
    }
  }
  const bodyShape = indexedCatalog[avatar.bodyShape]
  const skinColor = Color3.FromHexString(avatar.skinColor)
  const hairColor = Color3.FromHexString(avatar.hairColor)
  const eyeColor = Color3.FromHexString(avatar.eyeColor)

  const mouth = getWearableByCategory(avatar, 'mouth')
  const eyes = getWearableByCategory(avatar, 'eyes')
  const eyeBrows = getWearableByCategory(avatar, 'eyebrows')
  const facialHair = getWearableByCategory(avatar, 'facial_hair')
  const hair = getWearableByCategory(avatar, 'hair')
  const lowerBody = getWearableByCategory(avatar, 'lower_body')
  const upperBody = getWearableByCategory(avatar, 'upper_body')
  const feet = getWearableByCategory(avatar, 'feet')
  console.log([mouth, eyes, eyeBrows, facialHair, hair, lowerBody, upperBody, eyeColor])

  return async function(scene: Scene) {
    const [bodyModel, lowerModel, upperModel, feetModel, facialHairModel, hairModel] = await Promise.all([
      SceneLoader.LoadAssetContainerAsync(rootUrl(avatar, bodyShape), 'model.glb'),
      lowerBody && SceneLoader.LoadAssetContainerAsync(rootUrl(avatar, indexedCatalog[lowerBody]), 'model.glb'),
      upperBody && SceneLoader.LoadAssetContainerAsync(rootUrl(avatar, indexedCatalog[upperBody]), 'model.glb'),
      feet && SceneLoader.LoadAssetContainerAsync(rootUrl(avatar, indexedCatalog[feet]), 'model.glb'),
      facialHair && SceneLoader.LoadAssetContainerAsync(rootUrl(avatar, indexedCatalog[facialHair]), 'model.glb'),
      hair && SceneLoader.LoadAssetContainerAsync(rootUrl(avatar, indexedCatalog[hair]), 'model.glb')
    ])
    const containers = [bodyModel, lowerModel, upperModel, hairModel, facialHairModel, feetModel] as AssetContainer[]

    const facialFeatures = await Promise.all([
      promisedTexture(scene, 'eyes', rootUrl(avatar, indexedCatalog[eyes]) + 'model.png'),
      promisedTexture(scene, 'eyeBrows', rootUrl(avatar, indexedCatalog[eyeBrows]) + 'model.png'),
      promisedTexture(scene, 'mouth', rootUrl(avatar, indexedCatalog[mouth]) + 'model.png')
    ])
    const facialMasks = await Promise.all([
      promisedMask(scene, avatar, indexedCatalog[eyes]),
      promisedMask(scene, avatar, indexedCatalog[eyeBrows]),
      promisedMask(scene, avatar, indexedCatalog[mouth])
    ])
    console.log(facialMasks, facialFeatures)

    containers.forEach(container => {
      if (!container) {
        return
      }
      for (let material of container.materials as PBRMaterial[]) {
        if (material.name === 'AvatarSkin_MAT') {
          material.albedoColor = skinColor
        }
        if (material.name === 'Hair_MAT') {
          material.albedoColor = hairColor
        }
      }
      if (container === bodyModel) {
        for (let mesh of container.meshes) {
          if (mesh.name.endsWith('lBody_BaseMesh') && lowerModel) {
            mesh.setEnabled(false)
          }
          if (mesh.name.endsWith('uBody_BaseMesh') && upperModel) {
            mesh.setEnabled(false)
          }
          if (mesh.name.endsWith('Feet_BaseMesh') && feetModel) {
            mesh.setEnabled(false)
          }
          if (mesh.name.endsWith('Mask_Eyebrows')) {
            applyNewMaterial(scene, mesh, facialFeatures[1], hairColor, facialMasks[1], hairColor)
          }
          if (mesh.name.endsWith('Head')) {
            mesh.setEnabled(true)
          }
          if (mesh.name.endsWith('Mask_Eyes')) {
            applyNewMaterial(scene, mesh, facialFeatures[0], eyeColor, facialMasks[0], eyeColor)
          }
          if (mesh.name.endsWith('Mask_Mouth')) {
            applyNewMaterial(scene, mesh, facialFeatures[2], eyeColor, facialMasks[1], skinColor)
          }
        }
      }
    })

    return [bodyModel, lowerModel, upperModel, hairModel, facialHairModel, lowerModel, upperModel, feetModel]
  }
}

function applyNewMaterial(scene: Scene, mesh: AbstractMesh, texture: Texture, color: Color3, mask?: Texture, secondColor?: Color3) {
  const newMaterial = new StandardMaterial('eyesmat', scene)
  newMaterial.alphaMode = PBRMaterial.PBRMATERIAL_ALPHABLEND
  newMaterial.backFaceCulling = true
  texture.hasAlpha = true
  newMaterial.sideOrientation = Orientation.CW
  newMaterial.diffuseTexture = texture
  newMaterial.diffuseColor = mask ? color : Color3.Black()
  if (mask) {
    newMaterial.emissiveColor = secondColor
    newMaterial.emissiveTexture = mask
  }
  mesh.material = newMaterial
}
