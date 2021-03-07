const jwt = require('jsonwebtoken')
const generateError = require("./generate_error")
const { InvalidAccessTokenError, NoAccessTokenProvidedError, MalformattedTokenError, InvalidAuthenticationMethodError, UnauthorizedError } = require('../../../domain/errors')

module.exports = {
  checkUserIsAuthenticated: (req, res, next) => {
    try {
      const authHeader = req.headers.authorization
      validateAuthHeader(authHeader)

      const parts = authHeader.split(' ')
      validateAuthHeaderFormat(parts)

      const [scheme, token] = parts
      validateAuthenticationMethod(scheme)
      validateAccessToken(req, token)

      return next()
    }
    catch (e) {
      generateError(res, e)
    }
  },

  checkUserIsAuthorized: (roleList = []) => {
    return (req, res, next) => {
      try {
        validatePermission(req.user.role, roleList)
        return next()
      }
      catch (e) {
        generateError(res, e, 401)
      }
    }
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

const validateAccessToken = (req, token) => jwt.verify(
  token,
  process.env.JWT_HASH,
  (error, decoded) => {
    if (error) {
      handleInvalidAccessToken()
    }
    handleValidAccessToken(req, decoded)
  }
)

const handleInvalidAccessToken = _ => {
  throw new InvalidAccessTokenError()
}

const handleValidAccessToken = (req, decoded) => {
  req.user = {
    id: decoded.id,
    role: decoded.role
  }
}

const validatePermission = (role, roleList) => {
  if (roleList.length && !roleList.includes(role)) {
    throw new UnauthorizedError()
  }
}
