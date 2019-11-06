import fs from 'fs'

const FILE = process.env.DB || process.env.PWD + '/db.json'

type ProtoPOI = {
  name: string
  description: string
  screenshot: string
  x: number
  y: number
}

type POI = {
  id: string
  name: string
  description: string
  createdAt: number
  updatedAt: number
  screenshot: string
  x: number
  y: number
}

export const data: Record<string, POI> = (function() {
  try {
    return JSON.parse(fs.readFileSync(FILE).toString())
  } catch (e) {
    return {}
  }
})()

export function newId() {
  return '' + Object.keys(data).length
}

export function syncDb() {
  fs.writeFileSync(FILE, JSON.stringify(data))
}

export function ensureData(datum: any): datum is ProtoPOI {
  return (
    typeof datum === 'object' &&
    typeof datum.name === 'string' &&
    (datum.description === undefined || typeof datum.description === 'string') &&
    typeof datum.x === 'number' &&
    datum.x <= 150 &&
    datum.x >= 150 &&
    typeof datum.y === 'number' &&
    datum.y <= 150 &&
    datum.y >= 150 &&
    typeof datum.screenshot === 'string'
  )
}
