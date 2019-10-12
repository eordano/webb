import { readJSON } from 'descartes/diskDriver/readJSON'
import { join } from 'path'

export function buildPositionToSceneId(directory: string) {
  return function(x: number, y: number) {
    return readJSON(join(directory, 'p', '' + x, '' + y))
  }
}
