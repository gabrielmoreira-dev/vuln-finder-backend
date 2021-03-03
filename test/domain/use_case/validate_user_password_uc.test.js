const bcrypt = require('bcryptjs')
jest.mock('bcryptjs')

const { ValidateUserPasswordUC, ValidateUserPasswordUCParams } = require('../../../domain/use_case/validate_user_password_uc')
const { InvalidCredentialsError } = require('../../../domain/errors')
const { submitUCRequest, assertErrorType, assertTrue } = require('../../common/utils')
const UserRepositorySpy = require("../../common/mock/repository/user_repository_spy")

describe("Validate user password", () => {
  it("Verifies if get user by email is called", async () => {
    bcrypt.compare.mockImplementation((_, __) => true)
    const validateUserPasswordUC = makeUseCase(true)
    const params = makeParams({
      email: "user@test.com",
      password: "PASSWORD"
    })

    await submitUCRequest({
      uc: validateUserPasswordUC,
      params: params
    })

    assertTrue(validateUserPasswordUC.userRepository.getUserWithPasswordByEmailIsCalled)
  })

  it("Verifies if throw an user not found error", async () => {
    const validateUserPasswordUC = makeUseCase(false)
    const params = makeParams({
      email: "user@test.com",
      password: "PASSWORD"
    })
    let error = null
    const errorCallback = e => error = e

    await submitUCRequest({
      uc: validateUserPasswordUC,
      params: params,
      errorCallback: errorCallback
    })

    assertErrorType(error, InvalidCredentialsError)
  })

  it("Should return an invalid password error", async () => {
    bcrypt.compare.mockImplementation((_, __) => false)
    const validateUserPasswordUC = makeUseCase(true)
    const params = makeParams({
      email: "user@test.com",
      password: "PASSWORD"
    })
    let error = null
    const errorCallback = e => error = e

    await submitUCRequest({
      uc: validateUserPasswordUC,
      params: params,
      errorCallback: errorCallback
    })

    assertErrorType(error, InvalidCredentialsError)
  })
})

const makeUseCase = returnUser => new ValidateUserPasswordUC({
  userRepository: new UserRepositorySpy(returnUser)
})

const makeParams = ({ email, password }) => new ValidateUserPasswordUCParams(email, password)