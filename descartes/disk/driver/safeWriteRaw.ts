import path from 'path'
import { ensureDir } from './ensureDir'
import { writeRaw } from './writeRaw'

export async function safeWriteRaw(filePath: string, data: Buffer) {
  const file = path.resolve(filePath)
  const dir = path.dirname(file)
  await ensureDir(dir)
  await writeRaw(filePath, data)
}
