const { MissingRequiredParameterError } = require('../../../domain/errors')

module.exports = params => params.forEach(param => {
  if (!param) {
    throw new MissingRequiredParameterError()
  }
})