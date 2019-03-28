let config = {}; try { config = require('./config.json') } catch (ex) { /* ignored */ }

const superSecretKey = config.supersecretkey
if (!superSecretKey) throw new Error('you need a super secret key to get this proxy work!')

const crypto = require('./crypto')(config)
const http = require('http')
const url = require('url')

const port = parseInt(process.env.PORT || config.port || 22001, 10)
const deviceId = crypto.generateDeviceId()

const stations = require('./stations')
const homePage = require('./templates/home')
const notFound = require('./templates/notFound')

http.createServer((req, res) => {
  const path = url.parse(req.url).pathname
  console.info('%s %s', req.method, path)

  if (path === '/') {
    return homePage(req, res)
  }

  if (path === '/robots.txt') {
    res.setHeader('Content-Type', 'text/plain')
    res.write('User-agent: *\nDisallow: /')
    res.end()
    return
  }

  const isHD = path.endsWith('HD')
  const station = path.slice(1, isHD ? -2 : undefined)

  if (!stations.includes(station)) {
    return notFound(req, res)
  }

  const postfix = isHD ? `HD?hdauth=${crypto.hdAuth(deviceId, crypto.getTime())}` : '';
  const radioUrl = `http://media-ice.musicradio.com/Heart${station}${postfix}`
  http.request(radioUrl, {
    headers: {
      'User-Agent': 'hearthttp/1.0'
    }
  }, (heart) => {
    Object.keys(heart.headers).forEach(key => {
      res.setHeader(key, heart.headers[key])
    })
    heart.pipe(res)
  }).end()
}).listen(port, config.host)

console.info('heart radio proxy ready; device id: %s, port %d', deviceId, port)

