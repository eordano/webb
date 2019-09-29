import { readdirSync } from 'fs'
import { join } from 'path'

const dir = join(__dirname, '..', '..', 'base-avatars')

export function getCategories() {
  return readdirSync(dir)
}
