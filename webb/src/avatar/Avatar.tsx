import { SceneLoader } from '@babylonjs/core'
import * as Loaders from '@babylonjs/loaders'
import { RootState } from 'dcl/kernel/core/types'
import React from 'react'
import { BabylonScene } from './babylon/scene'

const p = new Loaders.GLTFFileLoader()
SceneLoader.RegisterPlugin(p)

export function Avatar(props: RootState) {
  return (
    <div>
      <h2>Avatar renderer</h2>
      <BabylonScene
        onSceneMount={args => {
          const { canvas, engine, scene } = args

          // The first parameter can be used to specify which mesh to import. Here we import all meshes
          SceneLoader.Append('https://models.babylonjs.com/', 'alien.glb', scene, function(newMeshes) {
            scene.createDefaultCameraOrLight(true, true, true)
            scene.activeCamera.attachControl(canvas, false)

            engine.runRenderLoop(() => {
              if (scene) {
                scene.render()
              }
            })
          })
        }}
      ></BabylonScene>
    </div>
  )
}
