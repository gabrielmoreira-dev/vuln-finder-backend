const jwt = require('jsonwebtoken')

const GetAccessTokenUC = class {
  getFuture = params => this.generateAccessToken({
    id: params.id,
    role: params.role
  })

  generateAccessToken = (id, role) => jwt
    .sign({ id, role }, process.env.JWT_HASH, { expiresIn: 86400 })
}

const GetAccessTokenUCParams = class {
  constructor(id, role) {
    this.id = id
    this.role = role
  }
}

module.exports = { GetAccessTokenUC, GetAccessTokenUCParams }