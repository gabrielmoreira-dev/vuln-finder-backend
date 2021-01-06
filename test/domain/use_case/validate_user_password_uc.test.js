const bcrypt = require('bcryptjs')
jest.mock('bcryptjs')

const { ValidateUserPasswordUC, ValidateUserPasswordUCParams } = require('../../../domain/use_case/validate_user_password_uc')
const { UserNotFoundError, InvalidPasswordError } = require('../../../domain/errors')
const { registeredUser, unregisteredUser, submitUCRequest, assertNull, assertErrorType } = require('../../test_utils')

const validPassword = registeredUser.password
const invalidPassword = '123Abc@#'

beforeAll(() => {
  bcrypt.compare.mockImplementation((a, b) => a === b)
})

describe("Validate user password", () => {
  it("Should not return an error if the password is correct", async () => {
    const validateUserPasswordUC = makeUseCase()
    const params = makeParams({
      email: registeredUser.email,
      password: validPassword
    })
    let error = null
    const errorCallback = e => error = e

    await submitUCRequest({
      uc: validateUserPasswordUC,
      params: params,
      errorCallback: errorCallback
    })

    assertNull(error)
  })

  it("Should return an user not found error", async () => {
    const validateUserPasswordUC = makeUseCase()
    const params = makeParams({
      email: unregisteredUser.email,
      password: validPassword
    })
    let error = null
    const errorCallback = e => error = e

    await submitUCRequest({
      uc: validateUserPasswordUC,
      params: params,
      errorCallback: errorCallback
    })

    assertErrorType(error, UserNotFoundError)
  })

  it("Should return an invalid password error", async () => {
    const validateUserPasswordUC = makeUseCase()
    const params = makeParams({
      email: registeredUser.email,
      password: invalidPassword
    })
    let error = null
    const errorCallback = e => error = e

    await submitUCRequest({
      uc: validateUserPasswordUC,
      params: params,
      errorCallback: errorCallback
    })

    assertErrorType(error, InvalidPasswordError)
  })
})

const makeUseCase = _ => {
  const mockUserRepository = {
    getUserWithPasswordByEmail: email => registeredUser.email == email ?
      registeredUser :
      null
  }
  return new ValidateUserPasswordUC({
    userRepository: mockUserRepository
  })
}

const makeParams = ({ email, password }) => new ValidateUserPasswordUCParams(email, password)