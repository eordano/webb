import { writeFile } from 'fs'

export async function writeRaw(filePath: string, data: Buffer) {
  return new Promise(async (resolve, reject) => {
    try {
      writeFile(filePath, data, err => {
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
