const UserDBM = require('../model/user')

module.exports = class {
  insertUser = user => UserDBM
    .create(user)

  getUserByEmail = email => UserDBM
    .findOne({ email })

  getUserWithPasswordByEmail = email => UserDBM
    .findOne({ email })
    .select('+password')
}