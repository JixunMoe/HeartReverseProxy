
const stations = require('../stations')
const layout = require('./layout')

/**
 * Home page message.
 */stations
 const msg = (() => {
  const maxLen = 1 + stations.reduce((max, cur) => Math.max(cur.length, max), 0)
  const spaces = new Array(maxLen + 1).join(' ')
  const padSpace = (n, text) => spaces.slice(-(n - text.length))

  return `
Why not try some stations?

${stations.map(station => `* <a href="/${station}" class="n">/${station}</a> [<a
     href="/${station}HD"> HD </a>]`).join('\n')}
`.trim()
})()

module.exports = (req, res) => {
  layout(req, res, msg)
}