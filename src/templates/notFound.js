const layout = require('./layout')

module.exports = (req, res) =>
  layout(req, res, `....:-:::::-....: Page Not Found

The content you are looking for...
   ... does not exist!      _(:3__



Try something else?
<a class=o href="/">Home Page</a>
<a class=o href="https://jixun.moe/">Jixun's Blog (Chinese content)</a>
<a class=o href="https://jixun.uk/" >Jixun's Blog (English content)</a>
`, 404)
