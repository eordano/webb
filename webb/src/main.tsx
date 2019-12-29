import { RootState } from 'dcl/kernel/core/types'
import { setWorldPosition } from 'dcl/kernel/scene-atlas/01-user-position/actions'
import { getCurrentWorldPosition } from 'dcl/kernel/scene-atlas/02-parcel-sight/selectors'
import React from 'react'
import { Position } from './controls/Position'

export function Main(props: { state: RootState; dispatch: any }) {
  const { state, dispatch } = props
  const positionReport = getCurrentWorldPosition(state)
  const setX = (x: number) => dispatch(setWorldPosition({ ...positionReport.position, x }))
  const setY = (y: number) => dispatch(setWorldPosition({ ...positionReport.position, y }))
  const setZ = (z: number) => dispatch(setWorldPosition({ ...positionReport.position, z }))
  return (
    <div>
      <Position {...positionReport.position} {...{ setX, setY, setZ }}></Position>
    </div>
  )
}
