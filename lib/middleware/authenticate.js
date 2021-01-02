const jwt = require('jsonwebtoken')

const generateError = require('../common/generate_error')
const errors = require('../common/errors')

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return generateError(res, 401, errors.noAuthenticationTokenProvided)
  }

  const parts = authHeader.split(' ')

  if (parts.length !== 2) {
    return generateError(res, 401, errors.malformattedToken)
  }

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme)) {
    return generateError(res, 401, errors.invalidAuthenticationMethod)
  }

  return jwt.verify(token, process.env.JWT_HASH, (error, decoded) => {
    if (error) {
      return generateError(res, 401, errors.invalidToken)
    }

    req.user = {
      id: decoded.id,
      role: decoded.role
    }

    return next()
  })
}