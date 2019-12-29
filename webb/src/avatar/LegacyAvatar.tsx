import { CubeTexture, SceneLoader, HemisphericLight, Vector3 } from '@babylonjs/core'
import * as Loaders from '@babylonjs/loaders'
import { RootState } from 'dcl/kernel/core/types'
import React, { useState } from 'react'
import { BabylonScene } from './babylon/scene'

const p = new Loaders.GLTFFileLoader()
SceneLoader.RegisterPlugin(p)

export function Avatar(props: RootState) {
  const models = useState('base-male')
  return (
    <div>
      <h2>Avatar renderer</h2>
      <BabylonScene
        onSceneMount={args => {
          const { canvas, engine, scene } = args
          console.log(models)

          // Define a general environment texture
          var hdrTexture = CubeTexture.CreateFromPrefilteredData('static/babylonEngine/environment.dds', scene)
          new HemisphericLight("sun", new Vector3(0,1,0), scene);
          scene.environmentTexture = hdrTexture

          scene.createDefaultSkybox(hdrTexture, true, 200, 0.7)

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
