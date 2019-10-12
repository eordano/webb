import { readRaw } from 'descartes/diskDriver/readRaw'
import path from 'path'

export function buildJsonContentData(targetDir: string) {
  return async function(cid: string) {
    return readRaw(path.join(targetDir, 'content', cid))
  }
}
