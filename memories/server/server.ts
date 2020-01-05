import cors from 'cors'
import express from 'express'
import { promises } from 'fs'
import path from 'path'
import { json } from 'body-parser'

const currentWD = process.env.CWD || process.env.BUILD_WORKING_DIRECTORY || process.env.PWD

export async function createServer(port: number = 8000) {
  const app = express()
  app.use(cors())
  app.use(json())

  const episodes = promises.readdir(path.join(currentWD, 'episodes'))
  const steps = promises.readdir(path.join(currentWD, 'steps'))

  app.post('/steps', async (req, res, next) => {
      const body = await req.body()
      console.log(body)
      res.json({ ok: true })
  })
  app.get('/steps', async (req, res, next) => {
      console.log(steps)
      res.json({ steps })
  })
  app.get('/episodes', async (req, res, next) => {
      console.log(episodes)
      res.json({ episodes })
  })
  console.log(`> Running on port ${port}`)
  return app.listen(port)
}


createServer()