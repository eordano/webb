import { parcelLimits } from 'dcl/utils'
import React from 'react'
import { Segment } from '../components/liteui/dcl'

export type PositionControl = {
  x: number
  y: number
  z: number
  setX: (newX: number) => void
  setY: (newY: number) => void
  setZ: (newZ: number) => void
}

export function Position(props: PositionControl) {
  const { x, y, z, setX, setY, setZ } = props
  return (
    <Segment>
      <h2>Position Control</h2>
      <h4>
        Current scene: {Math.floor(x / parcelLimits.parcelSize)}, {Math.floor(z / parcelLimits.parcelSize)}{' '}
      </h4>
      <button onClick={() => setX(x + 16)}>x+1</button>
      <button onClick={() => setX(x - 16)}>x-1</button>
      <button onClick={() => setZ(z + 16)}>z+1</button>
      <button onClick={() => setZ(z - 16)}>z-1</button>
      <input value={x} onChange={ev => setX(parseInt(ev.target.value, 10))}></input>
      <input value={y} onChange={ev => setY(parseInt(ev.target.value, 10))}></input>
      <input value={z} onChange={ev => setZ(parseInt(ev.target.value, 10))}></input>
    </Segment>
  )
}
