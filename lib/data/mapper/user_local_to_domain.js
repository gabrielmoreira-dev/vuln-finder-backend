const User = require('../../../domain/model/user')

module.exports = userLM => {
  return new User({
    id: userLM._id,
    name: userLM.name,
    email: userLM.email,
    password: userLM.password,
    role: userLM.role
  })
}