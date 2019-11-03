import fetch from 'node-fetch'
import { fetchAll } from './fetchAll'
import { configureDescartes } from './implementation'

import { targetUrl, target, mode } from './basicConfig'
export const descartes = configureDescartes({
  fetchFun: fetch as any,
  url: targetUrl,
  storageDirectory: target,
  disk: true,
  net: true,
  memory: true
})
{
  fetchAll(mode).catch(e => console.log(e))
}
