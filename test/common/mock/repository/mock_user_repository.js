const UserDataRepository = require("../../../../domain/data_repository/user_data_repository")

module.exports = class extends UserDataRepository {
  isInsertUserCalled = false
  isGetUserByEmailCalled = false
  isGetUserWithPasswordByEmailCalled = false

  insertUser = (name, email, password, role) => {
    this.isInsertUserCalled = true
  }

  getUserByEmail = email => {
    this.isGetUserByEmailCalled = true
  }

  getUserWithPasswordByEmail = email => {
    this.isGetUserWithPasswordByEmailCalled = true
  }
}