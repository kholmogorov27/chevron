// eslint-disable-next-line no-undef
const httpServer = require('http-server')

const PORT = 8000

const server = httpServer.createServer({ root: './dist' })
server.listen(PORT)