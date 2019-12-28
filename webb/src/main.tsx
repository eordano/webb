import { setWorldPosition } from 'dcl/kernel/scene-atlas/01-user-position/actions'
import { getCurrentWorldPosition } from 'dcl/kernel/scene-atlas/02-parcel-sight/selectors'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Position } from './controls/Position'
import { configured } from './store'
import './StoreSyncedECS'
import { Atlas } from './atlas/Atlas'

configured.start()

const dispatch = configured.store.dispatch.bind(configured.store)
const getState = configured.store.getState.bind(configured.store)

const timeouts: any = {
  pending: -1
}

configured.store.subscribe(() => {
  if (timeouts.pending !== -1) {
    clearTimeout(timeouts.pending)
  }
  timeouts.pending = setTimeout(() => {
    const positionReport = getCurrentWorldPosition(getState())
    const setX = (x: number) => dispatch(setWorldPosition({ ...positionReport.position, x }))
    const setY = (y: number) => dispatch(setWorldPosition({ ...positionReport.position, y }))
    const setZ = (z: number) => dispatch(setWorldPosition({ ...positionReport.position, z }))
    ReactDOM.render(
      <div>
        <Position {...positionReport.position} {...{ setX, setY, setZ }}></Position>
        <Atlas {...getState()}></Atlas>
        <pre>{JSON.stringify(configured.store.getState(), null, 2)}</pre>{' '}
      </div>,
      document.getElementById('root')
    )
  }, 100)
})

configured.store.dispatch(setWorldPosition({ x: 0, y: 0, z: 0 }))
