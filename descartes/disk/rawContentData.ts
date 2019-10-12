import { join } from 'path'
import { readRaw } from '../disk/driver/readRaw'
import { safeWriteJSON } from '../disk/driver/safeWriteJSON'

export function diskRawContent(directory: string) {
  return async function(cid: string) {
    return readRaw(join(directory, 'c', cid))
  }
}

export function diskSaveRawContent(directory: string) {
  return async function(cid: string, data: Buffer) {
    await safeWriteJSON(join(directory, 'c', cid), data)
  }
}
