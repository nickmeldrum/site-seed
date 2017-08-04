import http from 'http'
import app from './app'

const defaultPort = 80

const server = http.createServer(app)

server.listen(process.env.PORT || defaultPort, '127.0.0.1')

console.log('listening...')
