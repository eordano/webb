import cors from 'cors'
import { indexedCatalog } from 'dcl/collections/src/catalog/outputCatalog'
import { Coordinate } from 'dcl/utils'
import { ears } from 'dcl/vangogh/ears'
import express from 'express'
import fileType from 'file-type'
import { DataResponse, getConnectedUsers } from '../datadog/getConnectedUsers'
import { Descartes } from '../logic/descartes'
import { deploys, deploysBefore, findUser, userMovements, userPerf } from '../metabase/metabase'

const cachedGetConnectedUsers = cachedRequest(
  (env: 'prod' | 'dev' | 'stg') => getConnectedUsers(env),
  _ => 'comms' + _
)

const cachedDeployments = cachedRequest(
  () => deploys(),
  () => 'deploys'
)

const cachedUsers = cachedRequest(
  (user: string) => findUser(user),
  _ => 'user' + _
)

const cachedMovements = cachedRequest(
  (user: string) => userMovements(user),
  t => 'move' + t
)

const cachedPerf = cachedRequest(
  (user: string) => userPerf(user),
  t => 'perf' + t
)

export async function createServer(descartes: Descartes, port: number = 1338) {
  const app = express()
  app.use(cors())

  /*
   * Env might be one of: stg, prod, dev
   */
  app.get('/comms/:env/users', async (req, res, next) => {
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
      next(e)
    }
  })

  /*
   * Find by userId, email, or eth_address
   */
  app.get('/users/search/:how', async (req, res, next) => {
    try {
      const { how } = req.params
      console.log(`Users: request for ${how}`)
      const result: DataResponse = await cachedUsers(how)
      res.json(result).end
    } catch (e) {
      console.log(e)
      next(e)
    }
  })
  app.get('/users/search', async (req, res, next) => {
    try {
      console.log(`Users: request for all`)
      const result: DataResponse = await cachedUsers('')
      res.json(result).end
    } catch (e) {
      console.log(e)
      next(e)
    }
  })
  app.get('/users/movements/:userId', async (req, res, next) => {
    try {
      const { userId } = req.params
      console.log(`Users: movement request for ${userId}`)
      const result: DataResponse = await cachedMovements(userId)
      res.json(result).end
    } catch (e) {
      console.log(e)
      next(e)
    }
  })
  app.get('/users/perf/:userId', async (req, res, next) => {
    try {
      const { userId } = req.params
      console.log(`Users: perf request for ${userId}`)
      const result: DataResponse = await cachedPerf(userId)
      res.json(result).end
    } catch (e) {
      console.log(e)
      next(e)
    }
  })

  app.get('/deployments', async (req, res, next) => {
    try {
      const result = await deploysBefore(req.query.before ? req.query.before : new Date().toISOString())
      res.json(result).end
    } catch (e) {
      console.log(e)
      next(e)
    }
  })

  app.get('/dashboard/deployments', async (_, res) => {
    try {
      const result = await cachedDeployments('')
      res.json(result).end
    } catch (e) {
      console.log(e)
      res.end(JSON.stringify({ error: 'unknown' }))
    }
  })

  app.get('/ecs/:x/:y', async (req, res, next) => {
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
      next(e)
    }
  })

  app.get('/scene/:x/:y/*', async (req, res, next) => {
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
      if (sceneId) {
        const mapping = await descartes.getMappingForSceneId(sceneId)
        const hash = mapping[path]
        console.log(`Content: ${x},${y}:${path} -> ${hash}`)
        const content = await descartes.getContent(hash)
        if (content) {
          const type = fileType(content)
          if (type) {
            res.header('content-type: ' + type.mime)
          }
        }
        res.end(content)
      } else {
        res.status(404).json({ status: 'not_found' })
      }
    } catch (e) {
      console.log(`Fetch for (${x}, ${y}: ${path}) failed:`, e)
      next(e)
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
      cids.split(',').map(async (_: string) => [_, await descartes.getMappingForSceneId(_)])
    )

    res.send({
      data: sceneMap
        .filter(it => !!it[1])
        .map(([sceneId, currentMap]) => ({
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
    const content = await descartes.getContent(req.params['cid'])
    if (content) {
      const type = fileType(content)
      if (type) {
        res.header('content-type: ' + type.mime)
      }
    }
    res.end(content)
  })

  app.get('/wearable/:base/:collection/:name/:file', async (req, res) => {
    console.log(`Fetch wearable:`, req.params)
    const { collection, base, name, file } = req.params
    const asset = indexedCatalog[`dcl://${collection}/${name}`]
    const exists = !!asset
    if (!exists) {
      console.log('no asset', collection, name)
      res.status(404).end()
      return
    }
    const representation = selectRepresentation(asset, 'dcl://base-avatars/' + base)
    if (!representation) {
      console.log('no representation')
      res.status(404).end()
      return
    }
    const assetName = file.startsWith('model.') ? representation.mainFile : file
    if (!assetName) {
      console.log('no filename')
      res.status(404).end()
      return
    }
    const hash = selectFile(representation, assetName)
    if (!hash) {
      console.log('no file')
      res.status(404).end()
      return
    }
    const content = await descartes.getContent(hash)
    if (content) {
      const type = fileType(content)
      if (type) {
        res.header('content-type: ' + type.mime)
      }
    }
    res.end(content)
  })

  return app.listen(port)
}
function selectRepresentation(asset: any, baseShape: string) {
  const representation = asset.representations.filter((_: any) => _.bodyShapes.includes(baseShape))
  return representation ? representation[0] : null
}
function selectFile(representation: any, name: string) {
  const value = representation.contents.filter((_: any) => _.file === name)
  if (value && value.length) {
    return value[0].hash
  } else {
    return null
  }
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
