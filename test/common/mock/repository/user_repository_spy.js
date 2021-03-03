const UserDataRepository = require("../../../../domain/data_repository/user_data_repository")
const UserBuilder = require("../../data_builder/user_builder")

module.exports = class extends UserDataRepository {
  insertUserIsCalled = false
  getUserByEmailIsCalled = false
  getUserWithPasswordByEmailIsCalled = false

  returnUser = null
  user = UserBuilder
    .withEmail("user@test.com")
    .withRole("Customer")
    .build()

  constructor(returnUser = true) {
    super()
    this.returnUser = returnUser
  }

  insertUser = (_, __, ___, _____) => {
    this.insertUserIsCalled = true
    return this.returnUser ? this.user : null
  }

  getUserByEmail = _ => {
    this.getUserByEmailIsCalled = true
    return this.returnUser ? this.user : null
  }

  getUserWithPasswordByEmail = _ => {
    this.getUserWithPasswordByEmailIsCalled = true
    return this.returnUser ? this.user : null
  }
}