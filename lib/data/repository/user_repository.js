const UserDataRepository = require('../../../domain/data_repository/user_data_repository')
const toDM = require('../mapper/user_local_to_domain')

module.exports = class extends UserDataRepository {
  constructor({ userLDS }) {
    super()
    this.userLDS = userLDS
  }

  insertUser = user => this.userLDS
    .insertUser(user)
    .then(toDM)

  getUserByEmail = email => this.userLDS
    .getUserByEmail(email)
    .then(toDM)

  getUserWithPasswordByEmail = email => this.userLDS
    .getUserWithPasswordByEmail(email)
    .then(toDM)
}