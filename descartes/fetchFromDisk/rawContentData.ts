import { readRaw } from 'descartes/diskDriver/readRaw'
import { join } from 'path'

export function buildRawContentData(directory: string) {
  return async function(cid: string) {
    return readRaw(join(directory, 'c', cid))
  }
}
