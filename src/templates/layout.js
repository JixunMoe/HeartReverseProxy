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

a.o {
  margin-top: .25em;
  min-width: 24em;
  display: inline-block;
}

a.o:before {
  content: '/**/>/**/';
}

a:hover, a:focus {
  background: #fff;
  color: #000;
}

#m {
  margin: 2rem /**/ auto;
  max-width: 20em;
}

`.replace(/\s/g, '').replace(/\/\*\*\//g, ' ')

let buildStatic = false

module.exports = (req, res, msg, statusCode = 200) => {
  const result = `<!doctype html>
<html lang="en">
<head>
  <title>Heart Radio [192kbps]</title>
  <style>${style}</style>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />
  <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
  <link rel="icon" type="image/png" href="/favicon-196x196.png" sizes="196x196" />
</head>
<body>
  <pre id=m>Heart Radio in HQ! v1
===========================
By Jixun&lt;<a href="https://jixun.moe">https://jixun.moe</a>&gt;

Personal use only.


${msg}</pre>

<script async defer src="/script/main.js"></script>
</body>
</html>`

  if (buildStatic) {
    return result
  }

  res.statusCode = statusCode
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.write(result)
  res.end()
}

module.exports.enableStaticBuildMode = () => {
  buildStatic = true
}
