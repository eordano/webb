import { Coordinate } from '@dcl/utils'
import express from 'express'
import { Descartes } from '../logic/descartes'

function everythingInside(x1: number, x2: number, y1: number, y2: number) {
  const res: Coordinate[] = []
  for (let i = x1; i <= x2; i++) {
    for (let j = y1; j <= y2; j++) {
      res.push({ x: i, y: j })
    }
  }
  return res
}

export function createServer(descartes: Descartes, port: number = 1337) {
  const app = express()

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
    const sceneMap = await Promise.all(cids.split(',').map(async (_: string) => [_, await descartes.getMappingForSceneId(cids)]))
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
