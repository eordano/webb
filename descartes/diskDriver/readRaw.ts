import { readFile } from 'fs'

export async function readRaw(filePath: string): Promise<Buffer> {
  return new Promise(async (resolve, reject) => {
    try {
      readFile(filePath, (err, data) => {
        if (err) {
          return reject(err)
        }
        return resolve(data)
      })
    } catch (e) {
      return reject(e)
    }
  })
}
