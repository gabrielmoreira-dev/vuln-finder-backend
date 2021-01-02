const UserDataRepository = require('../../../domain/data_repository/user_data_repository')
const UserRDS = require('../remote/data_source/user_rds')
const mapToDM = require('../mapper/user_remote_to_domain')

module.exports = class extends UserDataRepository {

  constructor() {
    super()
    this.userRDS = new UserRDS()
  }

  insertUser = userEntity => this.userRDS.insertUser(userEntity)
    .then(mapToDM)

  getUserByEmail = email => this.userRDS.getUserByEmail(email)
    .then(mapToDM)

  getUserWithPasswordByEmail = email => this.userRDS.getUserWithPasswordByEmail(email)
    .then(mapToDM)
}