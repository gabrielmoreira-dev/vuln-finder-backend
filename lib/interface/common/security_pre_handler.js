const jwt = require('jsonwebtoken')
const { InvalidAccessTokenError, NoAccessTokenProvidedError, MalformattedTokenError, InvalidAuthenticationMethodError } = require('../../../domain/errors')

module.exports = {
  checkUserIsAuthenticated: (req, res, next) => {
    const authHeader = req.headers.authorization
    validateAuthHeader(authHeader)

    const parts = authHeader.split(' ')
    validateAuthHeaderFormat(parts)

    const [scheme, token] = parts
    validateAuthenticationMethod(scheme)

    return validateAccessToken(token)
  }
}

const validateAuthHeader = authHeader => {
  if (!authHeader) {
    throw new NoAccessTokenProvidedError()
  }
}

const validateAuthHeaderFormat = parts => {
  if (parts.length !== 2) {
    throw new MalformattedTokenError()
  }
}

const validateAuthenticationMethod = scheme => {
  if (!/^Bearer$/i.test(scheme)) {
    throw new InvalidAuthenticationMethodError()
  }
}

const validateAccessToken = token => jwt.verify(
  token,
  process.env.JWT_HASH,
  (error, decoded) => {
    if (error) {
      throw new InvalidAccessTokenError()
    }
    req.user = {
      id: decoded.id,
      role: decoded.role
    }
    return next()
  }
)
