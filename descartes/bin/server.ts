import fetch from 'node-fetch'
import { target, targetUrl } from './basicConfig'
import { createServer } from './cachedServer'
import { configureDescartes } from './implementation'

export const descartes = configureDescartes(fetch as any, targetUrl, target)

{
  createServer(descartes)
}
