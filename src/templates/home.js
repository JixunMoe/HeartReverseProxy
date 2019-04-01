const stations = require('../stations')
const layout = require('./layout')

let custom = { list: [] }
try {
  custom = require('../custom')
} catch (error) {
  /* ignored */
  console.error(error)
}

function generateUrl(station, name, hasHd) {
  let html = `* <a href="/${station}" class="n">/${name}</a>`

  if (hasHd) {
    html += ` [<a href="/${station}HD"> HD </a>]`
  }

  return html
}

/**
 * Home page message.
 */
const msg = (() => {
  return `Why not try some stations?

${stations.map(station => generateUrl(station, station, true)).join('\n')}
${custom.list.map(({ name, text, hasHd }) => generateUrl(name, text, hasHd)).join('\n')}
`})()

module.exports = (req, res) => layout(req, res, msg, 200)

