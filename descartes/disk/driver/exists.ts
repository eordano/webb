import { stat } from 'fs'

export function exists(filePath: string) {
  return new Promise(resolve => {
    stat(filePath, err => {
      if (err) {
        return resolve(false)
      }
      return resolve(true)
    })
  })
}
