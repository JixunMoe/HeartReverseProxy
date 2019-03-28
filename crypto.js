const crypto = require('crypto')

/**
 * Create device signature from given device and time.
 * @param {string} deviceId       Device ID to be signed.
 * @param {number} time           Time (in seconds) when the request is generated.
 * @param {string} superSecretKey A super secret key used to generate sign.
 */
function signDevice(deviceId, time, superSecretKey) {
  const hash = crypto.createHash('sha256')
  hash.update(`${deviceId}:${time}:${superSecretKey}`)
  return hash.digest('hex')
}

module.exports = (config) => {
  return {
    generateDeviceId: () => crypto.randomBytes(8).toString('hex'),
    getTime: () => (Date.now() / 1000) | 0,
    hdAuth: (deviceId, time) => {
      const key = signDevice(deviceId, time, config.supersecretkey)
      return `${deviceId}:${time}:${key}`
    },
  }
}