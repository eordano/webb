import { setWorldPosition } from './actions'
import { userPositionReducer, INITIAL_USER_POSITION } from './reducer'

describe('user position reducer', () => {
  it('setting the world position updates the user position in the grid', () => {
    expect([setWorldPosition({ x: -42, y: 16, z: 40 })].reduce(userPositionReducer, INITIAL_USER_POSITION).world).toEqual({
      x: -42,
      y: 16,
      z: 40
    })
  })
})
