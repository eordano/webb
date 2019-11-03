import { join } from 'path'

export const cacheB: Record<string, Buffer> = {}
export function memoryRawContent(directory: string) {
  return async function(cid: string): Promise<Buffer | undefined> {
    return Promise.resolve(cacheB[join(directory, 'c', cid)])
  }
}

export function memorySaveRawContent(directory: string) {
  return async function(cid: string, data: Buffer) {
    cacheB[join(directory, 'c', cid)] = data
    return Promise.resolve()
  }
}
