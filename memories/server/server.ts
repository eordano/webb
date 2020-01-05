import { json, urlencoded } from 'body-parser'
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
  app.use(urlencoded({ extended: true }))

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

  async function add(id: string, episode: string) {
    episodes[id] = episode
    await promises.writeFile(pathTo('episodes/' + id), episode)
  }
  async function remove(id: string) {
    delete episodes[id]
    await promises.unlink(pathTo('episodes/' + id))
  }

  app.post('/steps', async (req, res, next) => {
    try {
      const body = req.body
      let id = body.id
      if (!body.add && !body.remove && !body.edit) {
        return res.status(400).end()
      }
      if (body.add) {
        await add(body.id, body.body)
      }
      if (body.edit) {
        console.log('editing')
        try {
          await remove(body.id)
        } catch (e) {}
        await add(body['new-id'], body.body)
        id = body['new-id']
      }
      if (body.remove) {
        await remove(body.id)
      }
      const stepId = new Date().getTime()
      await promises.writeFile(pathTo('steps/' + stepId), JSON.stringify(body))
      steps[stepId] = JSON.stringify(body)
      res.redirect('http://localhost:3000/ep/' + id)
    } catch (e) {
      console.log(e)
      res.redirect('http://localhost:3000/')
    }
  })
  app.get('/list', async (req, res) => {
    res.json(Object.keys(episodes))
  })
  app.get('/ep/:id', async (req, res) => {
    const { id } = req.params
    const episode = episodes[id]
    res.json({ id, episode })
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
