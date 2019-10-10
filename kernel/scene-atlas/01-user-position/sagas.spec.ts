import { setWorldPosition, userEnteredCoordinate } from './actions'
import { handleSetWorldPosition } from './sagas'

describe('position grid & world coordination saga', () => {
  it('setting the world position updates the string copy of grid user pos', async () => {
    const sagaResult = handleSetWorldPosition(setWorldPosition({ x: -42, y: 16, z: 32 })).next().value
    expect(sagaResult.payload.action).toEqual(userEnteredCoordinate({ x: -3, y: 2 }))
  })
})
