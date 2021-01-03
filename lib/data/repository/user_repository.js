const UserDataRepository = require('../../../domain/data_repository/user_data_repository')
const UserLDS = require('../local/data_source/user_lds')
const mapToDM = require('../mapper/user_local_to_domain')

module.exports = class extends UserDataRepository {

  constructor() {
    super()
    this.userLDS = new UserLDS()
  }

  insertUser = userEntity => this.userLDS
    .insertUser(userEntity)
    .then(mapToDM)

  getUserByEmail = email => this.userLDS
    .getUserByEmail(email)
    .then(mapToDM)

  getUserWithPasswordByEmail = email => this.userLDS
    .getUserWithPasswordByEmail(email)
    .then(mapToDM)
}