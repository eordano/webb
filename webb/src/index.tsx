import { SceneLoader } from '@babylonjs/core'
import * as Loaders from '@babylonjs/loaders'
import { setWorldPosition } from 'dcl/kernel/scene-atlas/01-user-position/actions'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Main } from './main'
import { configured } from './store'
import './StoreSyncedECS'

const p = new Loaders.GLTFFileLoader()
SceneLoader.RegisterPlugin(p)

configured.start()

export const dispatch = configured.store.dispatch.bind(configured.store)
export const getState = configured.store.getState.bind(configured.store)

const timeouts: any = {
  pending: -1
}

configured.store.subscribe(() => {
  if (timeouts.pending !== -1) {
    clearTimeout(timeouts.pending)
  }
  timeouts.pending = setTimeout(() => {
    ReactDOM.render(<Main state={getState()} dispatch={dispatch} />, document.getElementById('root'))
  }, 100)
})

configured.store.dispatch(setWorldPosition({ x: 190, y: 0, z: 100 }))
