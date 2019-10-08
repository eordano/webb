import { setWorldPosition } from './actions'
import { userPositionReducer } from './reducer'

describe('user position reducer', () => {
  it('setting the world position updates the user position in the grid', () => {
    expect([setWorldPosition({ x: -42, y: 16, z: 40 })].reduce(userPositionReducer, undefined).grid).toEqual({
      x: -3,
      y: 2
    })
  })
  it('setting the world position updates the string copy of grid user pos', () => {
    expect([setWorldPosition({ x: -42, y: 16, z: 32 })].reduce(userPositionReducer, undefined).stringGrid).toEqual(
      '-42,16'
    )
  })
})
