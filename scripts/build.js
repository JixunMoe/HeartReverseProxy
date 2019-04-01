const fs = require('fs')
const layout = require('../src/templates/layout')
layout.enableStaticBuildMode()

try {
  fs.mkdirSync(`${__dirname}/../public/pages/`)
} catch (err) {
  if (err.code !== 'EEXIST') {
    throw err
  }
}

const pages = ['home', 'configError', 'notFound'];
pages.forEach(page => {
  console.info('[*] Generate page "%s"...', page)
  const content = require('../src/templates/' + page)({}, {})
  fs.writeFileSync(`${__dirname}/../public/pages/${page}.html`, content, 'utf-8')
});
