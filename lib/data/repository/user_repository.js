const UserDataRepository = require('../../../domain/data_repository/user_data_repository')
const UserDS = require('../orm/data_source/user_ds')
const mapToDM = require('../mapper/user_database_to_domain')

module.exports = class extends UserDataRepository {

  constructor() {
    super()
    this.userDS = new UserDS()
  }

  insertUser = userEntity => this.userDS
    .insertUser(userEntity)
    .then(mapToDM)

  getUserByEmail = email => this.userDS
    .getUserByEmail(email)
    .then(mapToDM)

  getUserWithPasswordByEmail = email => this.userDS
    .getUserWithPasswordByEmail(email)
    .then(mapToDM)
}