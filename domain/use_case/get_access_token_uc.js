const jwt = require('jsonwebtoken')

const { UserNotFoundError } = require('../errors')

const GetAccessTokenUC = class {
  constructor({ userRepository }) {
    this.userRepository = userRepository
  }

  getFuture = async params => {
    const user = await this.userRepository.getUserByEmail(params.email)
    if (!user) {
      throw new UserNotFoundError()
    }
    return this.generateAccessToken({
      id: user.id,
      role: user.role
    })
  }

  generateAccessToken = params => jwt
    .sign(params, process.env.JWT_HASH, { expiresIn: 86400 })
}

const GetAccessTokenUCParams = class {
  constructor(email) {
    this.email = email
  }
}

module.exports = { GetAccessTokenUC, GetAccessTokenUCParams }