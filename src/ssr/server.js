import express from 'express'
import http from 'http'

import 'dev-cache-clear'
import viewSetup from 'view-setup'

const defaultPort = 80
const app = express()

viewSetup(app)

app.use((req, res, next) => {
  require('./app')(req, res, next)
})

const server = http.createServer(app)

server.listen(defaultPort, () => {
  console.log('ssr server listening...')
})
