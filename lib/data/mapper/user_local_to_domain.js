const User = require('../../../domain/model/user')

const toDM = userLM => new User({
  id: userLM._id,
  name: userLM.name,
  email: userLM.email,
  password: userLM.password,
  role: userLM.role
})

module.exports = data => {
  if (!data) {
    return null
  }
  if (Array.isArray(data)) {
    return data.map(toDM)
  }
  return toDM(data)
}
