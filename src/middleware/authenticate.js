const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {

  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).send({
      error: 'No authentication token provided'
    })
  }

  const parts = authHeader.split(' ')

  if (parts.length !== 2) {
    return res.status(401).send({
      error: 'Malformatted token'
    })
  }

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({
      error: 'Invalid authentication method'
    })
  }

  return jwt.verify(token, process.env.JWT_HASH, (error, decoded) => {
    if (error) {
      return res.status(401).send({
        error: 'Invalid token'
      })
    }
    req.user = {
      id: decoded.id,
      role: decoded.role
    }
    return next()
  })

}