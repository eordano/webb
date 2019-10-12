import { writeFile } from 'fs'

export async function writeJSON(filePath: string, data: object) {
  return new Promise(async (resolve, reject) => {
    try {
      writeFile(filePath, JSON.stringify(data, null, 2), err => {
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
