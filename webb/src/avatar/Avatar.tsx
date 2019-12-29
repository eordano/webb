import { Color3, Vector3 } from '@babylonjs/core'
import { RootState } from 'dcl/kernel/core/types'
import { catalogsRequest } from 'dcl/kernel/passports/actions'
import { generateRandomUserProfile } from 'dcl/kernel/passports/requests/generateRandomUserProfile'
import React, { useContext, useEffect, useState } from 'react'
import { BabylonJSContext, Engine, Scene } from 'react-babylonjs'
import { store } from '../store'

export function Avatar(props: RootState) {
  const babylonContext = useContext(BabylonJSContext)
  const [avatar, setAvatar] = useState()
  useEffect(() => {
    if (avatar === undefined) {
      setAvatar('loading')
    }
    if (!props.passports.catalogs['base-avatars'] && avatar !== 'catalog fetching') {
      setAvatar('catalog fetching')
      store.dispatch(catalogsRequest())
      return
    }
    if (typeof avatar === 'string' && props.passports.catalogs['base-avatars']) {
      setAvatar(null)
      generateRandomUserProfile('Guest: John').then(passport => {
        setAvatar(passport.avatar)
      })
      return
    }
  })
  if (typeof avatar !== 'object' || avatar === null) {
    return <div />
  }
  const gender = avatar.bodyShape.split('/')[3]
  return (
    <div>
      <h2>Avatar renderer</h2>
      <div>
        <pre>{JSON.stringify(avatar, null, 2)}</pre>
        <Engine
          canvasId="sample-canvas"
          babylonJSContext={babylonContext}
          canvasStyle={{ width: '200px', height: '300px' }}
        >
          <Scene>
            <freeCamera name="camera1" position={new Vector3(0, 5, -10)} cameraDirection={Vector3.Zero()} />
            <hemisphericLight
              name="light1"
              intensity={0.7}
              groundColor={new Color3(0.8, 0.2, 0.2)}
              direction={Vector3.Up()}
            />
            <model
              rootUrl={`http://localhost:1338/wearable/${gender}/base-avatars/${gender}/`}
              sceneFilename="model.glb"
            />
            {avatar.wearables.map((wearable: any) => {
              const id = wearable.replace('dcl://', '')
              return (
                <model rootUrl={`http://localhost:1338/wearable/${gender}/${id}/`} sceneFilename="model.glb" key={id} />
              )
            })}
          </Scene>
        </Engine>
      </div>
    </div>
  )
}
