import { AssetContainer, Color3, PBRMaterial, Scene, SceneLoader, Texture, TextureAssetTask } from '@babylonjs/core'
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

function promisedTexture(scene: Scene, name: string, url: string): Promise<Texture> {
  return new Promise((resolve, reject) => {
    const task = new TextureAssetTask(name, url)
    task.onError = () => reject(task.errorObject)
    task.onSuccess = () => {
      resolve(task.texture)
    }
    task.run(scene, resolve, reject)
  })
}

export function FullAvatar(props: { avatar: Avatar }): any {
  for (let wearable of props.avatar.wearables) {
    if (!indexedCatalog[wearable]) {
      console.log('Not found: ', wearable)
    }
  }
  const bodyShape = indexedCatalog[props.avatar.bodyShape]
  const skinColor = Color3.FromHexString(props.avatar.skinColor)
  const hairColor = Color3.FromHexString(props.avatar.hairColor)
  const eyeColor = Color3.FromHexString(props.avatar.eyeColor)

  const mouth = getWearableByCategory(props.avatar, 'mouth')
  const eyes = getWearableByCategory(props.avatar, 'eyes')
  const eyeBrows = getWearableByCategory(props.avatar, 'eyebrows')
  const facialHair = getWearableByCategory(props.avatar, 'facial_hair')
  const hair = getWearableByCategory(props.avatar, 'hair')
  const lowerBody = getWearableByCategory(props.avatar, 'lower_body')
  const upperBody = getWearableByCategory(props.avatar, 'upper_body')
  const feet = getWearableByCategory(props.avatar, 'feet')
  console.log([mouth, eyes, eyeBrows, facialHair, hair, lowerBody, upperBody])

  return async function(scene: Scene) {
    const [
      bodyModel,
      lowerModel,
      upperModel,
      feetModel,
      facialHairModel,
      eyesModel,
      eyebrowsModel,
      mouthModel,
      hairModel
    ] = await Promise.all([
      SceneLoader.LoadAssetContainerAsync(rootUrl(props.avatar, bodyShape), 'model.glb'),
      lowerBody && SceneLoader.LoadAssetContainerAsync(rootUrl(props.avatar, indexedCatalog[lowerBody]), 'model.glb'),
      upperBody && SceneLoader.LoadAssetContainerAsync(rootUrl(props.avatar, indexedCatalog[upperBody]), 'model.glb'),
      feet && SceneLoader.LoadAssetContainerAsync(rootUrl(props.avatar, indexedCatalog[feet]), 'model.glb'),
      facialHair && SceneLoader.LoadAssetContainerAsync(rootUrl(props.avatar, indexedCatalog[facialHair]), 'model.glb'),
      promisedTexture(scene, 'eyes', rootUrl(props.avatar, indexedCatalog[eyes]) + 'model.png'),
      promisedTexture(scene, 'eyeBrows', rootUrl(props.avatar, indexedCatalog[eyeBrows]) + 'model.png'),
      promisedTexture(scene, 'mouth', rootUrl(props.avatar, indexedCatalog[mouth]) + 'model.png'),
      hair && SceneLoader.LoadAssetContainerAsync(rootUrl(props.avatar, indexedCatalog[hair]), 'model.glb')
    ])
    const containers = [bodyModel, lowerModel, upperModel, hairModel, facialHairModel, feetModel] as AssetContainer[]

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
        if (material.name === 'AvatarMaskEyebrows_MAT') {
          material.albedoColor = hairColor
          material.albedoTexture = eyebrowsModel
        }
        if (material.name === 'AvatarMaskEyes_MAT') {
          material.albedoColor = eyeColor
          material.albedoTexture = eyesModel
        }
        if (material.name === 'AvatarMaskMouth_MAT') {
          material.albedoColor = skinColor
          material.albedoTexture = mouthModel
        }
      }
      if (container === bodyModel) {
        for (let mesh of container.meshes) {
          if (mesh.name === 'F_lBody_BaseMesh' || (mesh.name === 'M_lBody_BaseMesh' && upperModel)) {
            mesh.setEnabled(false)
          }
          if (mesh.name === 'F_uBody_BaseMesh' || (mesh.name === 'M_uBody_BaseMesh' && lowerModel)) {
            mesh.setEnabled(false)
          }
          if (mesh.name === 'F_Feet_BaseMesh' || (mesh.name === 'M_Feet_BaseMesh' && feetModel)) {
            mesh.setEnabled(false)
          }
        }
      }
    })

    return [bodyModel, lowerModel, upperModel, hairModel, facialHairModel, lowerModel, upperModel, feetModel]
  }
}
