import { SceneLoader, Vector3 } from '@babylonjs/core'
import * as Loaders from '@babylonjs/loaders'
import { RootState } from 'dcl/kernel/core/types'
import React, { useContext } from 'react'
import { BabylonJSContext, Engine, Scene } from 'react-babylonjs'

const p = new Loaders.GLTFFileLoader()
SceneLoader.RegisterPlugin(p)

export function Avatar(props: RootState) {
  const babylonContext = useContext(BabylonJSContext)
  return (
    <div>
      <h2>Avatar renderer</h2>
      <Engine canvasId="sample-canvas" babylonJSContext={babylonContext}>
        <Scene>
          <freeCamera name="camera1" position={new Vector3(0, 5, -10)} cameraDirection={Vector3.Zero()} />
          <hemisphericLight name="light1" intensity={0.7} direction={Vector3.Up()} />
          <sphere name="sphere1" diameter={2} segments={16} position={new Vector3(0, 1, 0)} />
          <ground name="ground1" width={6} height={6} subdivisions={2} />
        </Scene>
      </Engine>
    </div>
  )
}
