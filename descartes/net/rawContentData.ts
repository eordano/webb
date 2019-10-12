import { FetchFunction } from '../logic/lib/FetchFunction'

export function netRawContentData(fetchFun: FetchFunction, targetUrl: string) {
  return async function(cid: string) {
    const raw = await fetchFun(`${targetUrl}/content/${cid}`)
    if (!raw || !raw.success) {
      throw new Error(`Failure to fetch ${cid}: HTTP error code ${raw.status}`)
    }
    return Buffer.from(await raw.arrayBuffer())
  }
}
