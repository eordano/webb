import { mkdir } from 'fs'

export function createDir(path: string) {
  return new Promise((resolve, reject) => {
    mkdir(path, err => {
      if (err) {
        return reject(err)
      }
      return resolve(true)
    })
  })
}
