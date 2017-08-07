import http from 'http'
import app from './app'

const defaultPort = 80

const server = http.createServer(app)

server.listen(defaultPort, () => {
  console.log('webserver listening...')
})
