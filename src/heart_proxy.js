let config = {}; try { config = require('../config.json') } catch (ex) { /* ignored */ }

const superSecretKey = config.supersecretkey
if (!superSecretKey) throw new Error('you need a super secret key to get this proxy work!')

// Apply default config
config = Object.assign({
  handleStatic: true,
  proxy: true,
  port: 22001,
}, config)

const http = require('http')
const url = require('url')


const port = parseInt(process.env.PORT || config.port, 10)

const handler = (config.handleStatic ? require('./handler') : require('./proxy'))(config)

http.createServer((req, res) => {
  req.path = url.parse(req.url).pathname
  console.info('%s %s', req.method, req.path)
  handler(req, res)
}).listen(port, config.host)

console.info('heart radio proxy ready; port %d', port)
