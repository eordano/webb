import cors from 'cors'
import { Coordinate } from 'dcl/utils'
import { ears } from 'dcl/vangogh/ears'
import express from 'express'
import { DataResponse, getConnectedUsers } from '../datadog/getConnectedUsers'
import { Descartes } from '../logic/descartes'
import { deploys, findUser, userMovements, userPerf, deploysBefore } from '../metabase/metabase'

const cachedGetConnectedUsers = cachedRequest((env: 'prod' | 'dev' | 'stg') => getConnectedUsers(env), _ => 'comms' + _)

const cachedDeployments = cachedRequest(() => deploys(), () => 'deploys')

const cachedUsers = cachedRequest((user: string) => findUser(user), _ => 'user' + _)

const cachedMovements = cachedRequest((user: string) => userMovements(user), t => 'move' + t)

const cachedPerf = cachedRequest((user: string) => userPerf(user), t => 'perf' + t)

export function createServer(descartes: Descartes, port: number = 1338) {
  const app = express()
  app.use(cors())

  /*
   * Env might be one of: stg, prod, dev
   */
  app.get('/comms/:env/users', async (req, res) => {
    try {
      const { env } = req.params
      console.log(`Comms: request for ${env}`)
      if (!['prod', 'stg', 'dev'].includes(env)) {
        return res.status(400).end({ error: 'invalid environment (use prod, stg or dev)' })
      }
      const result: DataResponse = await cachedGetConnectedUsers(env as any)
      res.json(result).end
    } catch (e) {
      console.log(e)
      res.end({ error: 'unknown' })
    }
  })

  /*
   * Find by userId, email, or eth_address
   */
  app.get('/users/search/:how', async (req, res) => {
    try {
      const { how } = req.params
      console.log(`Users: request for ${how}`)
      const result: DataResponse = await cachedUsers(how)
      res.json(result).end
    } catch (e) {
      console.log(e)
      res.end({ error: 'unknown' })
    }
  })
  app.get('/users/search', async (req, res) => {
    try {
      console.log(`Users: request for all`)
      const result: DataResponse = await cachedUsers('')
      res.json(result).end
    } catch (e) {
      console.log(e)
      res.end({ error: 'unknown' })
    }
  })
  app.get('/users/movements/:userId', async (req, res) => {
    try {
      const { userId } = req.params
      console.log(`Users: movement request for ${userId}`)
      const result: DataResponse = await cachedMovements(userId)
      res.json(result).end
    } catch (e) {
      console.log(e)
      res.end({ error: 'unknown' })
    }
  })
  app.get('/users/perf/:userId', async (req, res) => {
    try {
      const { userId } = req.params
      console.log(`Users: perf request for ${userId}`)
      const result: DataResponse = await cachedPerf(userId)
      res.json(result).end
    } catch (e) {
      console.log(e)
      res.end({ error: 'unknown' })
    }
  })

  app.get('/deployments', async (req, res) => {
    try {
      const result = await deploysBefore(req.query.before ? req.query.before : new Date().toISOString())
      res.json(result).end
    } catch (e) {
      console.log(e)
      res.end({ error: 'unknown' })
    }
  })

  app.get('/dashboard/deployments', async (_, res) => {
    try {
      const result = await cachedDeployments('')
      res.json(result).end
    } catch (e) {
      console.log(e)
      res.end({ error: 'unknown' })
    }
  })

  app.get('/ecs/:x/:y', async (req, res) => {
    try {
      const { x, y } = req.params
      const success = { error: false }
      setTimeout(() => {
        success.error = true
        res
          .status(500)
          .json({ error: 'scene execution timed out ' })
          .end()
      }, 5000)
      const ecs = await ears(parseInt(x, 10), parseInt(y, 10))
      if (success.error) {
        return
      }
      console.log(`Ears: request for ${x},${y} ${success.error ? 'failed' : 'succeeded'}`)
      return res.json(ecs).end()
    } catch (e) {
      console.log(e)
      res.end({ error: 'unknown' })
    }
  })

  app.get('/scene/:x/:y/*', async (req, res) => {
    const { x, y } = req.params
    const path = req.path
      .split('/')
      .slice(4)
      .join('/')
    try {
      const xx = parseInt(x, 10)
      const yy = parseInt(y, 10)
      const mapToScene = await descartes.getSceneIdForCoordinates(everythingInside(xx, xx, yy, yy))
      const sceneId = mapToScene[`${xx},${yy}`]
      const mapping = await descartes.getMappingForSceneId(sceneId)
      const hash = mapping[path]
      console.log(`Content: ${x},${y}:${path} -> ${hash}`)
      return res.redirect('https://content.decentraland.org/contents/' + hash)
    } catch (e) {
      console.log(`Fetch for (${x}, ${y}: ${path}) failed:`, e)
      res.end({ error: 'unknown' })
    }
  })

  app.get('/scenes', async (req, res) => {
    if (!req.query.x1 || !req.query.x2 || !req.query.y1 || !req.query.y2) {
      return res.status(400).json(JSON.stringify({ error: 'Bad request, x1, y1, x2, y2 are required' }))
    }
    const { x1, x2, y1, y2 } = req.query
    console.log(`Queried: ${JSON.stringify(req.query)}`)
    const mapToScene = await descartes.getSceneIdForCoordinates(everythingInside(x1, x2, y1, y2))
    res.send({
      data: Object.keys(mapToScene).map(_ => ({ parcel_id: _, scene_cid: mapToScene[_], root_cid: mapToScene[_] }))
    })
  })

  app.get('/parcel_info', async (req, res) => {
    if (!req.query.cids) {
      return res.status(400).json(JSON.stringify({ error: 'Bad request, cids array argument is required' }))
    }
    const { cids } = req.query
    console.log(`Mapping: ${cids}`)
    const sceneMap = await Promise.all(
      cids.split(',').map(async (_: string) => [_, await descartes.getMappingForSceneId(cids)])
    )
    res.send({
      data: sceneMap.map(([sceneId, currentMap]) => ({
        root_cid: sceneId,
        scene_cid: sceneId,
        publisher: sceneId,
        content: {
          contents: Object.keys(currentMap).map(file => ({ file, hash: currentMap[file] }))
        }
      }))
    })
  })

  app.get('/contents/:cid', async (req, res) => {
    console.log(`Fetch content: ${req.params['cid']}`)
    res.end(await descartes.getContent(req.params['cid']))
  })

  return app.listen(port)
}

const MINS = 1
const SEGS = 1
const MILLIS = 1
const ONE_HOUR_IN_MILLIS = 60 * MINS * 60 * SEGS * 1000 * MILLIS
function everythingInside(x1: number, x2: number, y1: number, y2: number) {
  const res: Coordinate[] = []
  for (let i = x1; i <= x2; i++) {
    for (let j = y1; j <= y2; j++) {
      res.push({ x: i, y: j })
    }
  }
  return res
}
type CachedDataResponse = {
  lastTime: number
  result: DataResponse
}
const cachedComms: {
  prod?: CachedDataResponse
  dev?: CachedDataResponse
  stg?: CachedDataResponse
} = {}
function cachedRequest<T, R>(request: (params: T) => Promise<R>, serializeParams = (_: any) => _) {
  return async (params: T) => {
    const serialParams = serializeParams(params)
    const cached = cachedComms[serialParams]
    if (!cached || new Date().getTime() - cached.lastTime > ONE_HOUR_IN_MILLIS) {
      const result = {
        result: await request(params),
        lastTime: new Date().getTime()
      }
      cachedComms[serialParams] = result
    }
    return cachedComms[serialParams].result
  }
}
