const UserLM = require('../model/user_lm')

module.exports = class {
  insertUser = user => UserLM
    .create(user)

  getUserByEmail = email => UserLM
    .findOne({ email })

  getUserWithPasswordByEmail = email => UserLM
    .findOne({ email })
    .select('+password')
}