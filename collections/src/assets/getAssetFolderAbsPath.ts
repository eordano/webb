import { resolve, join } from 'path'

export function getAssetFolderAbsPath(postFix: string = __dirname, currentHeight: number = 3): string {
  return currentHeight === 0
    ? resolve(join(postFix, 'base-avatars'))
    : getAssetFolderAbsPath(join(postFix, '..', '..'), currentHeight - 1)
}
