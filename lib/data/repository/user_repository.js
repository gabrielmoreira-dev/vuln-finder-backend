const UserDataRepository = require('../../../domain/data_repository/user_data_repository')
const toDM = require('../mapper/user_local_to_domain')

module.exports = class extends UserDataRepository {
  constructor({ userLDS }) {
    super()
    this.userLDS = userLDS
  }

  insertUser = (name, email, password, role) => this.userLDS
    .insertUser({ name, email, password, role })

  getUserByEmail = email => this.userLDS
    .getUserByEmail(email)
    .then(user => user ? toDM(user) : null)

  getUserWithPasswordByEmail = email => this.userLDS
    .getUserWithPasswordByEmail(email)
    .then(user => user ? toDM(user) : null)
}