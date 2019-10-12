import { readFile } from 'fs'

export async function readJSON(filePath: string): Promise<object> {
  return new Promise(async (resolve, reject) => {
    try {
      readFile(filePath, (err, data) => {
        if (err) {
          return reject(err)
        }
        return resolve(JSON.parse(data.toString()))
      })
    } catch (e) {
      return reject(e)
    }
  })
}
