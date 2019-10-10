import { Vector2 } from '@dcl/utils'

export const cachedDeltas: Vector2[][] = []

function square(x: number) {
  return x * x
}

export function calculateCachedDeltas(radius: number) {
  cachedDeltas[radius] = []
  const squaredRadius = square(radius)
  for (let x = -radius; x <= radius; x++) {
    for (let y = -radius; y <= radius; y++) {
      if (x * x + y * y <= squaredRadius) {
        cachedDeltas[radius].push({ x, y })
      }
    }
  }
  cachedDeltas[radius].sort(function (a, b) {
    return square(a.x) + square(a.y) - square(b.x) - square(b.y)
  })
}
