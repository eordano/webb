import { join } from 'path'
import { readRaw } from '../disk/driver/readRaw'
import { safeWriteRaw } from './driver/safeWriteRaw'

export function diskRawContent(directory: string) {
  return async function(cid: string) {
    return readRaw(join(directory, 'c', cid))
  }
}

export function diskSaveRawContent(directory: string) {
  return async function(cid: string, data: Buffer) {
    await safeWriteRaw(join(directory, 'c', cid), data)
  }
}
