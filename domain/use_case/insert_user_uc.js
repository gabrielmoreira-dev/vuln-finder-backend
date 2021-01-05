const { UserAlreadyRegisteredError } = require('../errors')

const InsertUserUC = class {
  constructor({ userRepository }) {
    this.userRepository = userRepository
  }

  getFuture = async params => {
    const user = await this.userRepository.getUserByEmail(params.email)
    if (user) {
      throw new UserAlreadyRegisteredError()
    }
    return this.userRepository.insertUser(
      params.name,
      params.email,
      params.password,
      params.role
    )
  }
}

const InsertUserUCParams = class {
  constructor(name, email, password, role) {
    this.name = name
    this.email = email
    this.password = password
    this.role = role
  }
}

module.exports = { InsertUserUC, InsertUserUCParams }