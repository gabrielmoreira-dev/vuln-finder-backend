const GetIsUserRegisteredUC = class {
  constructor({ userRepository }) {
    this.userRepository = userRepository
  }

  getFuture = params => this.userRepository
    .getUserByEmail(params.email)
    .then(user => user != null)
}

const GetIsUserRegisteredUCParams = class {
  constructor({ email }) {
    this.email = email
  }
}

module.exports = { GetIsUserRegisteredUC, GetIsUserRegisteredUCParams }