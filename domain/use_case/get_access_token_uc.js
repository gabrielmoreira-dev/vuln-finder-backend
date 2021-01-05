const jwt = require('jsonwebtoken')

const GetAccessTokenUC = class {
  getFuture = params => jwt.sign({
    id: params.id,
    role: params.role
  }, process.env.JWT_HASH, {
    expiresIn: 86400
  })
}

const GetAccessTokenUCParams = class {
  constructor(id, role) {
    this.id = id
    this.role = role
  }
}

module.exports = { GetAccessTokenUC, GetAccessTokenUCParams }