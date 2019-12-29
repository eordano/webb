import { SceneLoader } from '@babylonjs/core'
import * as Loaders from '@babylonjs/loaders'
import { GLTFFileLoader, GLTFLoaderAnimationStartMode } from '@babylonjs/loaders'
import * as Materials from '@babylonjs/materials'
import { RootState } from 'dcl/kernel/core/types'
import React from 'react'
import { Avatar } from './avatar/Avatar'

console.log('Imported Loaders and Materials: ', Loaders, Materials)
SceneLoader.OnPluginActivatedObservable.add((loader: any) => {
  const prev = loader.preprocessUrlAsync.bind(loader) || ((_: string) => _)
  loader.preprocessUrlAsync = function(url: string) {
    return prev(url)
  }
  if (loader instanceof GLTFFileLoader) {
    loader.animationStartMode = GLTFLoaderAnimationStartMode.NONE
    loader.compileMaterials = true
    loader.validate = true
    loader.animationStartMode = 0
  }
})

export function Main(props: { state: RootState; dispatch: any }) {
  const { state } = props
  return (
    <div>
      <Avatar {...state} />
    </div>
  )
}
