const homePage = require('./templates/home')
const notFound = require('./templates/notFound')

try {
  require('serve-static')
} catch (error) {
  console.error('install `serve-static` or configure nginx static. See readme for more info.')
  throw error;
}

const serveStatic = require('serve-static')(`${__dirname}/../public/`)

module.exports = (config) => {
  const proxy = require('./proxy')(config)

  return (req, res) => {
    const path = req.path;

    if (path === '/') {
      return homePage(req, res)
    }

    return serveStatic(req, res, () => proxy(req, res, notFound))
  }
}
