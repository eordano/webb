import { StringPosition } from '@dcl/kernel/scene-atlas/01-user-position/types'
import { SceneIdString } from '@dcl/kernel/scene-atlas/04-sceneId-resolution/types'
import { join } from 'path'
import { readJSON } from '../disk/driver/readJSON'
import { safeWriteJSON } from '../disk/driver/safeWriteJSON'
import { PositionToSceneIdRecord } from '../logic/lib/PositionToSceneIdRecord'
import { FourCoordinates } from '../logic/lib/validateXY12'

export function diskPositionToSceneId(directory: string) {
  function fetchOne(coords: number[]) {
    return readJSON(join(directory, 'p', '' + coords[0], '' + coords[1]))
  }
  return async function(_: FourCoordinates) {
    const coordinates = []
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
    for (let i = _.x1; i <= _.x2; i++) {
      for (let j = _.y1; j <= _.y2; j++) {
        coordinates.push(`${i},${j}`)
      }
    }
    const data = await Promise.all(coordinates.map(_ => [_, fetchOne(_)]))
    return data.reduce((prev, _) => {
      prev[_[0]] = _[1]
      return prev
    }, {} as PositionToSceneIdRecord)
  }
}

export function diskSavePositionToSceneId(directory: string) {
  function saveOne(coords: StringPosition, sceneId: SceneIdString) {
    return safeWriteJSON(join(directory, 'p', coords), sceneId)
  }
  return async function($: FourCoordinates, positionMap: PositionToSceneIdRecord) {
    await Promise.all(Object.keys(positionMap).map(coord => saveOne(coord, positionMap[coord])))
  }
}