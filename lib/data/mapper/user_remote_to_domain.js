const User = require('../../../domain/model/user')

module.exports = userRM => {
  return new User({
    id: userRM.id,
    name: userRM.name,
    email: userRM.email,
    password: userRM.password,
    role: userRM.role
  })
}