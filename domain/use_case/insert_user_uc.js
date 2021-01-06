const bcrypt = require('bcryptjs')
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
    const hash = await bcrypt.hash(params.password, 10)
    return this.userRepository.insertUser(
      params.name,
      params.email,
      hash,
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