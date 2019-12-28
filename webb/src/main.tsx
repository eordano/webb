import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { configured } from './store'
import { setWorldPosition } from 'dcl/kernel/scene-atlas/01-user-position/actions'

configured.start()

configured.store.subscribe(() => {
  ReactDOM.render(<pre>{JSON.stringify(configured.store.getState(), null, 2)}</pre>, document.getElementById('root'))
})

configured.store.dispatch(setWorldPosition({ x: 0, y: 0, z: 0 }))