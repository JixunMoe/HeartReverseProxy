const httpErr = (code) => (req, res) => {
  res.statusCode = code
  res.end()
}

module.exports = httpErr
