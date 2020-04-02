// Coordinate.ts
/**
 * Contains types and methods to work with coordinates in a two-dimentional grid.
 * 
 * The main representation of a coordinate is a {@link TwoDimentionalGridPosition}. It's very close with the 
 * {@link TwoDimentionalPositionString} type, and they are homeomorphic (there is a 1:1 equivalence between them).
 * @packageDocumentation
 */
export function isNumber(param: any): param is number {
  return typeof param === 'number' && !isNaN(param)
}

/**
 * Coordinate is a type ({ x: number, y: number }) used to describe grid positions. 
 */
export type TwoDimentionalGridPosition = {
  x: number
  y: number
}
/**
 * It's **very** common to have a `x,y` string version of a {@link TwoDimentionalGridPosition}, for example in a
 * `scene.json` file or to be used as a key of a Map.
 */
export type TwoDimentionalPositionString = string

/**
 * Transform a {@link TwoDimentionalPositionString} into its equivalent {@link TwoDimentionalGridPosition}
 * @param coordinate `x,y` coordinates
 */
export function coordinateToString(coordinate: TwoDimentionalGridPosition): TwoDimentionalPositionString {
  return `${coordinate.x},${coordinate.y}`
}

export function stringToCoordinate(coordinate: string): TwoDimentionalGridPosition {
  const coordinateSplit = coordinate.split(',')
  if (coordinateSplit.length !== 2) {
    throw new TypeError(`Invalid coordinate: ${coordinate} is not in "x,y" format`)
  }
  const [x, y] = coordinateSplit.map(x => parseInt(x, 10))
  if (isNaN(x) || isNaN(y)) {
    throw new TypeError(`Invalid coordinate: ${coordinate} is not a couple of numbers`)
  }
  return { x, y }
}

export function isCoordinate(arg: any): arg is TwoDimentionalGridPosition {
  return typeof arg === 'object' && isNumber(arg.x) && isNumber(arg.y)
}
