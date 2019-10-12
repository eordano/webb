import path from 'path'
import { ensureDir } from './ensureDir'
import { writeJSON } from './writeJSON'

export async function safeWriteJSON(filePath: string, data: object | string) {
  const file = path.resolve(filePath)
  const dir = path.dirname(file)
  await ensureDir(dir)
  await writeJSON(filePath, data)
}
