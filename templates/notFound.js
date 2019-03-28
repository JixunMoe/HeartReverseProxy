const layout = require('./layout')

module.exports = (req, res) => {
  layout(req, res, `....:-:::::-....: Page Not Found

The content you are looking for...
   ... does not exist!      _(:3__



Try something else?
<section id="options">
 <a href="/">&gt; Home Page</a>
 <a href="https://jixun.moe/">&gt; Jixun's Blog (Chinese content)</a>
 <a href="https://jixun.uk/" >&gt; Jixun's Blog (English content)</a>
</section>
`)
}