import { json } from 'body-parser'
import cors from 'cors'
import { zipTwo } from 'dcl/utils'
import express from 'express'
import { promises } from 'fs'
import path from 'path'

const currentWD = process.env.CWD || process.env.BUILD_WORKING_DIRECTORY || process.env.PWD

export async function createServer(port: number = 8000) {
  const app = express()
  app.use(cors())
  app.use(json())

  const episodes = await readDirAsDict('episodes')
  const steps = await readDirAsDict('steps')

  async function readDirAsDict(dir: string) {
    const resolved = pathTo(dir)
    const entries = (await promises.readdir(resolved)).filter(fileName => !fileName.startsWith('.'))
    const files = await Promise.all(
      entries.map(entry => promises.readFile(path.join(resolved, entry)).then(body => body.toString()))
    )
    return zipTwo(entries, files)
  }

  function pathTo(pathName: string) {
    return path.join(currentWD, pathName)
  }

  app.post('/steps', async (req, res, next) => {
    try {
      const body = await req.body
      if (!body.add && !body.remove) {
        return res.status(400)
      }
      if (body.add) {
        episodes[body.id] = body.body
        await promises.writeFile(pathTo('episodes/' + body.id), body.body)
      }
      if (body.remove) {
        delete episodes[body.id]
        await promises.unlink(pathTo('episodes/' + body.id))
      }
      const stepId = new Date().getTime()
      await promises.writeFile(pathTo('steps/' + stepId), JSON.stringify(body))
      steps[stepId] = JSON.stringify(body)
      res.json({ ok: true })
    } catch (e) {
      console.log(e)
    }
  })
  app.get('/list', async (req, res) => {
    res.json(Object.keys(episodes))
  })
  app.get('/steps', async (req, res) => {
    res.json(steps)
  })
  app.get('/episodes', async (req, res) => {
    res.json(episodes)
  })
  console.log(`> Running on port ${port}`)
  return app.listen(port)
}

createServer()
