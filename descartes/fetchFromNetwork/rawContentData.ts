import { FetchFunction } from "../logic/lib/FetchFunction"

export function buildRawContentData(fetchFun: FetchFunction) {
    return function(targetUrl: string) {
      return async function (cid: string) {
        const raw = await fetchFun(`${targetUrl}/content/${cid}`)
        if (!raw || !raw.success) {
          throw new Error(`Failure to fetch ${cid}: HTTP error code ${raw.status}`)
        }
        return Buffer.from(await raw.arrayBuffer())
      } 
    }
  }
  