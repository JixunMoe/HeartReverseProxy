let config = {}; try { config = require('./config.json') } catch (ex) { /* ignored */ }

const superSecretKey = config.supersecretkey;
if (!superSecretKey) throw new Error('you need a super secret key to get this proxy work!')

const crypto = require('crypto')
const http = require('http')
const url = require('url')

const port = parseInt(process.env.PORT || config.port || 22001, 10)
const deviceId = crypto.randomBytes(8).toString('hex')

const getTime = () => (Date.now() / 1000) | 0;

/**
 * Create device signature from given device and time.
 * @param {*} deviceId Device ID to be signed.
 * @param {*} time     Time (in seconds) when the request is generated.
 */
function signDevice(deviceId, time) {
  const hash = crypto.createHash('sha256')
  hash.update(`${deviceId}:${time}:${superSecretKey}`)
  return hash.digest('hex')
}

/**
 * Home page message.
 */
const msg = (() => {
  const stations = [
    "UK", "80s", "extra", "Bath", "Bedfordshire", "BedsBucksHerts",
    "Berkshire", "Bristol", "Cambridge", "Colchester", "Cornwall",
    "Crawley", "Dorset", "EastDevon", "Edinburgh", "Essex", "Glasgow",
    "Gloucestershire", "Hampshire", "Harlow", "Kent", "London", "MiltonKeynes",
    "Norfolk", "NorthDevon", "NorthLancsCumbria", "NorthWales", "NorthWest",
    "Northamptonshire", "Oxfordshire", "Peterborough", "Plymouth", "Somerset",
    "SouthHams", "SouthWales", "Suffolk", "Sussex", "Teesside", "Torbay",
    "TyneWear", "Watford", "WestMids", "WestWales", "Wiltshire", "Yorkshire"
  ];

  const maxLen = 1 + stations.reduce((max, cur) => Math.max(cur.length, max), 0)
  const spaces = new Array(maxLen + 1).join(' ')
  const padSpace = (n, text) => spaces.slice(-(n - text.length))

  return `
Heart Radio in HQ! v1
===========================
By Jixun&lt;<a href="https://jixun.moe">https://jixun.moe</a>&gt;

Personal use only.


Why not try some stations?
${stations.map(station => `* <a href="/${station}">/${station}</a>${padSpace(maxLen, station)}[<a href="/${station}HD">/${station}HD</a>]`).join('\n')}
`.trim()
})()

http.createServer((req, res) => {
  const path = url.parse(req.url).pathname
  const station = path.slice(1)
  let hdAuth = '';

  if (path === '/') {
    res.setHeader('Content-Type', 'text/html')
    res.write(`<!doctype html>
<html lang="en">
<head>
  <title>Heart Radio [192kbps]</title>
</head>
<body>
  <pre>${msg}</pre>
</body>
</html>`)
    res.end()
    return
  }

  if (path === '/favicon.ico') {
    res.statusCode = 404
    res.end()
    return
  }

  console.info('%s %s', req.method, station)

  if (station.endsWith('HD')) {
    const time = getTime()
    const key = signDevice(deviceId, time)
    hdAuth = `?hdauth=${deviceId}:${time}:${key}`
  }

  const radioUrl = `http://media-ice.musicradio.com/Heart${station}${hdAuth}`;
  console.info('url: %s', radioUrl);

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

