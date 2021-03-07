const app = require('./app')
const http = require('http')

const { normalizePort, onError, onListening } = require('./utils')

const port = normalizePort(process.env.PORT || 3000)

const server = http.createServer(app)
server.listen(port)
server.on('error', onError)
server.on('listening', _ => onListening(port))