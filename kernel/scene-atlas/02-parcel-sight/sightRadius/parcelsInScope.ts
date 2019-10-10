import { GridPosition } from '../../01-user-position/types'
import { cachedDeltas, calculateCachedDeltas } from './calculateCachedDeltas'

export function parcelsInScope(radius: number, position: GridPosition): string[] {
  const result: string[] = []
  let length = cachedDeltas[radius] && cachedDeltas[radius].length
  if (!length) {
    calculateCachedDeltas(radius)
    length = cachedDeltas[radius].length
  }
  for (let i = 0; i < length; i++) {
    result.push(`${position.x + cachedDeltas[radius][i].x},${position.y + cachedDeltas[radius][i].y}`)
  }
  return result
}
