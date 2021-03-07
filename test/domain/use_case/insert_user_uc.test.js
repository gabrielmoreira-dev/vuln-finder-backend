const bcrypt = require('bcryptjs')
jest.mock('bcryptjs')

const { InsertUserUC, InsertUserUCParams } = require('../../../domain/use_case/insert_user_uc')
const { submitUCRequest, assertTrue, assertErrorType } = require('../../common/utils')
const { UserAlreadyRegisteredError } = require('../../../domain/errors')
const UserBuilder = require("../../common/data_builder/user_builder")
const UserRepositorySpy = require("../../common/mock/repository/user_repository_spy")

beforeAll(() => {
  bcrypt.hash.mockImplementation(() => '')
})

describe("Insert user", () => {
  it("Verifies if get user by email is called", async () => {
    const insertUserUC = makeUseCase(false)
    let user = UserBuilder
      .withName("user")
      .withEmail("user@test.com")
      .withPassword("12345678")
      .withRole("Customer")
      .build()
    const params = makeParams(user)

    await submitUCRequest({
      uc: insertUserUC,
      params: params,
    })

    assertTrue(insertUserUC.userRepository.getUserByEmailIsCalled)
  })

  it("Verifies if insert user is called", async () => {
    const insertUserUC = makeUseCase(false)
    let user = UserBuilder
      .withName("user")
      .withEmail("user@test.com")
      .withPassword("12345678")
      .withRole("Customer")
      .build()
    const params = makeParams(user)

    await submitUCRequest({
      uc: insertUserUC,
      params: params,
    })

    assertTrue(insertUserUC.userRepository.insertUserIsCalled)
  })

  it("Verifies if throw an user already registered error", async () => {
    const insertUserUC = makeUseCase(true)
    let user = UserBuilder
      .withName("user")
      .withEmail("user@test.com")
      .withPassword("12345678")
      .withRole("Customer")
      .build()
    const params = makeParams(user)
    let error = null

    await submitUCRequest({
      uc: insertUserUC,
      params: params,
      errorCallback: (e) => error = e
    })

    assertErrorType(error, UserAlreadyRegisteredError)
  })
})

const makeUseCase = returnUser => new InsertUserUC({
  userRepository: new UserRepositorySpy(returnUser)
})

const makeParams = ({ name, email, password, role }) =>
  new InsertUserUCParams(name, email, password, role)