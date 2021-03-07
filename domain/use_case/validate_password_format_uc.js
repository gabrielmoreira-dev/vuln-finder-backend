const { InvalidCredentialsError } = require('../../domain/errors')

const ValidatePasswordFormatUC = class {
  getFuture = params => {
    const password = params.password
    this.validatePasswordLength(password)
    this.validatePasswordComposition(password)
  }

  validatePasswordLength = password => {
    const minLength = 8
    if (password.length < minLength) {
      throw new InvalidCredentialsError()
    }
  }

  validatePasswordComposition = password => {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}/
    if (!password.match(regex)) {
      throw new InvalidCredentialsError()
    }
  }
}

const ValidatePasswordFormatUCParams = class {
  constructor(password) {
    this.password = password
  }
}

module.exports = { ValidatePasswordFormatUC, ValidatePasswordFormatUCParams }