const UserDataRepository = require('../../../domain/data_repository/user_data_repository')
const mapToDM = require('../mapper/user_local_to_domain')

module.exports = class extends UserDataRepository {

  constructor({ userLDS }) {
    super()
    this.userLDS = userLDS
  }

  insertUser = user => this.userLDS
    .insertUser(user)
    .then(mapToDM)

  getUserByEmail = email => this.userLDS
    .getUserByEmail(email)
    .then(mapToDM)

  getUserWithPasswordByEmail = email => this.userLDS
    .getUserWithPasswordByEmail(email)
    .then(mapToDM)
}