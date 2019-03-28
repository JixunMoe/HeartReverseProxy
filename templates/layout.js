const style = `

html, body {
  background: #000;
  color: #fff;
  font-size: 12pt;
}

a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

a.n {
  display: inline-block;
  width: 13em;
}

#options > a {
  min-width: 24em;
  display: inline-block;
}

a:hover, a:focus {
  background: #fff;
  color: #000;
}

#m {
  margin: 2rem /**/ auto;
  max-width: 20em;
}

`.replace(/\s/g, '').replace(/\/\*\*\//g, ' ');

module.exports = (req, res, msg) => {
  res.statusCode = 404
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.write(`<!doctype html>
<html lang="en">
<head>
  <title>Heart Radio [192kbps]</title>
  <style>${style}</style>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
  <pre id=m>Heart Radio in HQ! v1
===========================
By Jixun&lt;<a href="https://jixun.moe">https://jixun.moe</a>&gt;

Personal use only.


${msg}</pre>
</body>
</html>`)
  res.end()
}