import fs from 'fs'

const FILE = process.env.DB || process.env.PWD + '/db.json'

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

function validName(t: any) {
  return (typeof t !== 'string' || t.length < 3) && 'invalid name (3 chars)'
}
function validDescription(t: any) {
  return typeof t !== 'string' && 'invalid type of description'
}
function validCoordinate(t: any) {
  return (parseInt('' + t, 10) + '') !== ('' + t) && `invalid coordinate "${t}"`
}
function validObject(t: any) {
  return typeof t !== 'object' && 'invalid object'
}

export function ensureData(datum: any): string | true {
  return (
    validObject(datum) ||
    validDescription(datum.description) ||
    validName(datum.name) ||
    validCoordinate(datum.x) ||
    validCoordinate(datum.y) ||
    true
  )
}
