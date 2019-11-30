import { isLAND } from './LAND'

const exampleAddress = `0x0f5d2fb29fb7d3cfee444a200298f468908cc942`

describe('LAND', () => {
  it('has an `x`, `y`, and `owner` property that is an address', () => {
    const land = { x: 0, y: 0, owner: exampleAddress }
    expect(isLAND(land)).toBe(true)
    expect(isLAND({ y: 0, owner: '123123' })).toBe(false)
    expect(isLAND({ x: 0, owner: exampleAddress })).toBe(false)
    expect(isLAND('0,1')).toBe(false)
    expect(isLAND({ x: 0, y: 1 })).toBe(false)
  })
})