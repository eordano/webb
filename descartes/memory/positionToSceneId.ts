import { join } from 'path'
import { PositionToSceneIdRecord } from '../logic/lib/PositionToSceneIdRecord'
import { FourCoordinates } from '../logic/lib/validateXY12'

const cache: Record<string, string> = {}
export function memoryGetPositionToSceneId(directory: string) {
  return async function(_: FourCoordinates) {
    if (_.x1 > _.x2) {
      const c = _.x1
      _.x1 = _.x2
      _.x2 = c
    }
    if (_.y1 > _.y2) {
      const c = _.y1
      _.y1 = _.y2
      _.y2 = c
    }
    const result = {}
    for (let i = _.x1; i <= _.x2; i++) {
      for (let j = _.y1; j <= _.y2; j++) {
        try {
          const coord = `${i},${j}`
          if (!cache[join(directory, 'p', coord)]) {
            throw new Error()
          }
          result[coord] = cache[join(directory, 'p', coord)]
        } catch (e) {
          return Promise.resolve(null)
        }
      }
    }
    return Promise.resolve(result)
  }
}
export function memorySavePositionToSceneId(directory: string) {
  return async function($: FourCoordinates, positionMap: PositionToSceneIdRecord) {
    try {
      await Promise.all(
        Object.keys(positionMap).map(coord =>
          Promise.resolve((cache[join(directory, 'p', coord)] = positionMap[coord]))
        )
      )
    } catch (e) {
      console.log(e)
      setTimeout(() => process.exit(1), 100)
    }
  }
}
