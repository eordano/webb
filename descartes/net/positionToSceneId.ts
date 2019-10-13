import { FetchFunction } from '../logic/lib/FetchFunction'
import { SceneMappingRecord } from '../logic/lib/SceneMappingRecord'
import { FourCoordinates } from '../logic/lib/validateXY12'

export function netPositionToSceneId(fetchFun: FetchFunction, server: string) {
  return async function(_: FourCoordinates) {
    const url = `${server}/scenes?x1=${_.x1}&x2=${_.x2}&y1=${_.y1}&y2=${_.y2}`
    const result = await fetchFun(url)
    if (result.status !== 200) {
      throw new Error(`Error fetching ${JSON.stringify(_)}: ${result.status}`)
    }
    const data = await result.json()
    if (!data.data) {
      throw new Error(`Error fetching ${JSON.stringify(_)}: Unexpected result ${data}`)
    }
    const records = {}
    for (let i of data.data) {
      records[i.parcel_id] = i.scene_cid
    }
    return records as SceneMappingRecord
  }
}
