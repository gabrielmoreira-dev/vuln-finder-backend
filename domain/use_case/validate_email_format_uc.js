const { InvalidCredentialsError } = require('../errors')

const ValidateEmailFormatUC = class {
  getFuture = params => {
    const email = params.email
    this.validateEmailComposition(email)
  }

  validateEmailComposition = email => {
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    if (!email.match(regex)) {
      throw new InvalidCredentialsError()
    }
  }
}

const ValidateEmailFormatUCParams = class {
  constructor(email) {
    this.email = email
  }
}

module.exports = { ValidateEmailFormatUC, ValidateEmailFormatUCParams }