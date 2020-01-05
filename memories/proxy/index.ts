import express from 'express'
import http from 'http-proxy'

const apiProxy = http.createProxyServer()
const app = express()

app.use('/api', (req, res) => apiProxy.web(req, res, { target: 'http://localhost:9001' }))

app.use('/', (req, res) => apiProxy.web(req, res, { target: 'http://localhost:9002' }))

app.listen('9000')

console.log('> Running proxy: http://localhost:9000 to api at 9001 and web at 9002')