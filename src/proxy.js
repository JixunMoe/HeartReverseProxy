const http = require('http')
const https = require('https')
const stations = require('./stations')

let custom = async () => {}

try {
  custom = require('./custom')
} catch (error) {
  console.info('no custom rules, skip.')
}

function request(url, obj, handler) {
  const request = url.startsWith('http://') ? http : https
  return request.request(url, obj, handler)
}

module.exports = (config) => {
  const crypto = require('./crypto')(config)
  const deviceId = crypto.generateDeviceId()

  const notFound = config.handleStatic ? require('./templates/notFound') : require('./httpErr')(404)

  return async (req, res, next = notFound) => {
    const isHD = req.path.endsWith('HD')
    const station = req.path.slice(1, isHD ? -2 : undefined)

    let radioUrl = await custom(station, isHD, req, res)

    // Use default resolver
    if (!radioUrl) {
      if(stations.includes(station)) {
        const postfix = isHD ? `HD?hdauth=${crypto.hdAuth(deviceId, crypto.getTime())}` : ''
        radioUrl = `http://media-ice.musicradio.com/Heart${station}${postfix}`
      } else {
        return next(req, res)
      }
    }

    if (!config.proxy) {
      // Redirect to resolved url
      res.statusCode = 302
      res.setHeader('Location', radioUrl)
      res.end()
      return
    }

    request(radioUrl, {
      headers: {
        'User-Agent': 'hearthttp/1.0'
      }
    }, (heart) => {
      // Pass header over
      Object.keys(heart.headers).forEach(key => {
        let value = heart.headers[key]

        // Heart non-hd content-type error
        if (value === 'audio/aacp') {
          value = 'audio/aac'
        }

        res.setHeader(key, value)
      })
      heart.pipe(res)
    }).end()
  }
}
