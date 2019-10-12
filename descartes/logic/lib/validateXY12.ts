export type FourCoordinates = { x1: number; x2: number; y1: number; y2: number }

const isValidXY12 = {
  x1: true,
  x2: true,
  y1: true,
  y2: true
}

const AND = (_: boolean, __: boolean) => _ && __

export function validateXY12(coords: any): coords is FourCoordinates {
  const keys = Object.keys(isValidXY12)
  return keys.length === 4 &&
    keys.map(key => typeof coords[key] === 'number')
     .reduce(AND, true)
}