const jwt = require('jsonwebtoken')

const { UserNotFoundError } = require('../errors')

const GetAccessTokenUC = class {
  constructor({ userRepository }) {
    this.userRepository = userRepository
  }

  getFuture = params => {
    const user = this.userRepository.getUserByEmail(params.email)
    if (!user) {
      throw new UserNotFoundError()
    }
    return this.generateAccessToken({
      id: user.id,
      role: user.role
    })
  }

  generateAccessToken = (id, role) => jwt
    .sign({ id, role }, process.env.JWT_HASH, { expiresIn: 86400 })
}

const GetAccessTokenUCParams = class {
  constructor(email) {
    this.email = email
  }
}

module.exports = { GetAccessTokenUC, GetAccessTokenUCParams }