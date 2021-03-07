const { MissingRequiredParameterError } = require('../../../domain/errors')

module.exports = class {
  validateEntryParameters = params => params.forEach(param => {
    if (!param) {
      throw new MissingRequiredParameterError()
    }
  })
}