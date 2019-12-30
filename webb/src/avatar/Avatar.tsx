import { AssetContainer, Color3, Vector3 } from '@babylonjs/core'
import { RootState } from 'dcl/kernel/core/types'
import { catalogsRequest } from 'dcl/kernel/passports/actions'
import { generateRandomUserProfile } from 'dcl/kernel/passports/requests/generateRandomUserProfile'
import React, { useContext, useEffect, useState } from 'react'
import { BabylonJSContext, Engine, Scene } from 'react-babylonjs'
import { store } from '../store'
import { FullAvatar } from './FullAvatar'

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
  return (
    <div>
      <h2>Avatar renderer</h2>
      <div>
        <pre>{JSON.stringify(avatar, null, 2)}</pre>
        <Engine
          canvasId="sample-canvas"
          babylonJSContext={babylonContext}
          canvasStyle={{ width: '500px', height: '800px' }}
        >
          <Scene onSceneMount={async (args) => {
            const { scene } = args
            const containers = await FullAvatar({ avatar })(scene)
            containers.forEach((_: AssetContainer) => _ && _.addAllToScene())
          }}>
            <freeCamera
              name="camera1"
              position={new Vector3(0, 1.5, 3.4)}
              rotation={new Vector3(0.1, 3.1710396286766813, 0)}
            />
            <hemisphericLight
              name="light1"
              intensity={0.8}
              groundColor={new Color3(1, 1, 1)}
              direction={Vector3.Up()}
            />
          </Scene>
        </Engine>
      </div>
    </div>
  )
}
