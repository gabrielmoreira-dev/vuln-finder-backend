const User = require('../../../domain/model/user')

module.exports = userDBM => {
  return new User({
    id: userDBM.id,
    name: userDBM.name,
    email: userDBM.email,
    password: userDBM.password,
    role: userDBM.role
  })
}