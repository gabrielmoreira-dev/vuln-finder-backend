const UserRM = require('../model/user')

module.exports = class {
  insertUser = user => UserRM.create(user)

  getUserByEmail = email => UserRM.findOne({ email })

  getUserWithPasswordByEmail = email => UserRM
    .findOne({ email })
    .select('+password')
}