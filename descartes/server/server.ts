import fetch from 'node-fetch'
import { target, targetUrl } from '../bin/basicConfig'
import { createServer } from './cachedServer'
import { configureDescartes } from '../bin/implementation'

export const descartes = configureDescartes({
  fetchFun: fetch as any,
  url: targetUrl,
  storageDirectory: target,
  net: true,
  disk: true,
  memory: true
})
{
  createServer(descartes)
  console.log(`> Listening on port: 1338
> help endpoints
  - /comms/prod/users
  - /ecs/:x/:y
  - /contents/:cid
  - /scenes ? x1 = 0 & x2 = 10 & y1 = -100 & y2 = -110
  - /parcel_info ? cids = Qm123...4444,Qmzzz...999

> Waiting for queries...`)
}
