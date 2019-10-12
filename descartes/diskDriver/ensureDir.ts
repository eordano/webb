import path from 'path'
import { exists } from './exists'
import { createDir } from './createDir'

export async function ensureDir(dirPath: string) {
  if (dirPath === '/') {
    return true
  }
  ensureDir(path.dirname(dirPath))
  const dirExists = await exists(dirPath)
  if (!dirExists) {
    await createDir(dirPath)
  }
}
