import body from 'body-parser'
import cors from 'cors'
import express from 'express'
import { data, ensureData, newId, syncDb } from './poi'

export function createApp(port: number = 2345) {
  const app = express()
  app.use(cors())
  app.use(body.json())

  app.get('/poi', async (req, res) => {
    console.log(`GET /poi`)
    res.end(JSON.stringify(Object.values(data)))
  })

  app.post('/poi', async (req, res) => {
    console.log(`POST /poi`)
    const validation = ensureData(req.body)
    if (validation !== true) {
      console.log(`  received ${JSON.stringify(req.body)}`)
      return res.status(400).end(JSON.stringify({ error: 'invalid format: ' + validation }))
    }
    const id = newId()
    data[id] = { description: '', ...req.body, id, createdAt: new Date().getTime(), updatedAt: new Date().getTime() }
    syncDb()
    res.end(JSON.stringify(Object.values(data)))
  })

  app.get('/poi/:id', async (req, res) => {
    console.log(`GET /poi/:id`)
    res.end(JSON.stringify(data[req.params.id]))
  })

  app.put('/poi/:id', async (req, res) => {
    console.log(`PUT /poi/:id`)
    const validation = ensureData(req.body)
    if (validation !== true) {
      console.log(`  received ${req.body}`)
      return res.status(400).end(JSON.stringify({ error: 'invalid format: ' + validation }))
    }
    const id = req.params.id
    data[id] = { ...data[id], ...req.body, id, updatedAt: new Date().getTime() }
    syncDb()
    res.end(JSON.stringify(data[req.params.id]))
  })

  app.delete('/poi/:id', async (req, res) => {
    console.log(`DELETE /poi/:id`)
    const backup = data[req.params.id]
    delete data[req.params.id]
    syncDb()
    res.end(JSON.stringify({ success: true, poi: backup }))
  })

  return app.listen(port)
}
