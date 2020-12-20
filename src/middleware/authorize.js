const errors = require('../common/errors')
const generateError = require('../common/generate_error')

module.exports = (roles = []) => {

  return (req, res, next) => {
    if (roles.length && !roles.includes(req.user.role)) {
      return generateError(res, 401, errors.unauthorized)
    }

    return next()
  }

}