const UserRM = require('../model/user_rm')

module.exports = class {
  insertUser = user => UserRM
    .create(user)

  getUserByEmail = email => UserRM
    .findOne({ email })

  getUserWithPasswordByEmail = email => UserRM
    .findOne({ email })
    .select('+password')
}