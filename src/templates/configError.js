const layout = require('./layout')

module.exports = (req, res) => 
  layout(req, res, `.....-:::::-::::: Internal Server Error

Internal Server Configuration Error
-----------------------------------

 -&gt; Is <code>handleStatic</code> enabled but not configured?
 -&gt; Conflict configuration?

`, 500)
