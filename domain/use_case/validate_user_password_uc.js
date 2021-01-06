const bcrypt = require('bcryptjs')
const { UserNotFoundError, InvalidPasswordError } = require('../errors')

const ValidateUserPasswordUC = class {
  constructor({ userRepository }) {
    this.userRepository = userRepository
  }

  getFuture = async params => {
    const password = params.password
    const user = await this.userRepository.getUserWithPasswordByEmail(params.email)
    if (!user) {
      throw new UserNotFoundError
    }
    await this.validatePassword(user, password)
  }

  validatePassword = async (user, password) => {
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      throw new InvalidPasswordError()
    }
  }
}

const ValidateUserPasswordUCParams = class {
  constructor(email, password) {
    this.email = email
    this.password = password
  }
}

module.exports = { ValidateUserPasswordUC, ValidateUserPasswordUCParams }