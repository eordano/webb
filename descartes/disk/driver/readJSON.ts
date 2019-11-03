import { readFile } from 'fs'

export async function readJSON(filePath: string, retries: number = 10): Promise<object> {
  return new Promise(async (resolve, reject) => {
    const tryLater = () =>
      setTimeout(
        () =>
          readJSON(filePath, retries - 1)
            .then(resolve)
            .catch(reject),
        1000
      )
    try {
      readFile(filePath, (err, data) => {
        try {
          if (err) {
            if (retries === 0 || err.code && err.code === 'ENOENT') {
              return reject(err)
            } else {
              if (retries < 3) {
                console.log('WARNING! Retries critically low', filePath, err)
              }
              return tryLater()
            }
          }
          return resolve(JSON.parse(data.toString()))
        } catch (e) {
          return tryLater()
        }
      })
    } catch (e) {
      tryLater()
    }
  })
}

export async function readJSONWithoutRetry(filePath: string): Promise<object> {
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
