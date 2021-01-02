const User = require('../model/user')

module.exports = class {
  insertUser(userEntity) {
    return User.create(userEntity)
  }

  getUserByEmail(email) {
    return User.findOne({ email })
  }

  getUserWithPasswordByEmail(email) {
    return User.findOne({ email }).select('+password')
  }
}