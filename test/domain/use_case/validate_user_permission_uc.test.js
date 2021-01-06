const { ValidateUserPermissionUC, ValidateUserPermissionUCParams } = require('../../../domain/use_case/validate_user_permission_uc')
const { UserNotFoundError, UnauthorizedError } = require('../../../domain/errors')
const { registeredUser, unregisteredUser, submitUCRequest, assertNull, assertErrorType } = require('../../test_utils')

describe("Validate user permission", () => {
  it("Should authorize an user", async () => {
    const validateUserPermissionUC = makeUseCase()
    const params = makeParams({
      email: registeredUser.email,
      roleList: ['Customer']
    })
    let error = null
    const errorCallback = e => error = e

    await submitUCRequest({
      uc: validateUserPermissionUC,
      params: params,
      errorCallback: errorCallback
    })

    assertNull(error)
  })

  it("Should throw an user not found exception", async () => {
    const validateUserPermissionUC = makeUseCase()
    const params = makeParams({
      email: unregisteredUser.email,
      roleList: ['Customer']
    })
    let error = null
    const errorCallback = e => error = e

    await submitUCRequest({
      uc: validateUserPermissionUC,
      params: params,
      errorCallback: errorCallback
    })

    assertErrorType(error, UserNotFoundError)
  })

  it("Should throw an unauthorized exception", async () => {
    const validateUserPermissionUC = makeUseCase()
    const params = makeParams({
      email: registeredUser.email,
      roleList: ['Professional']
    })
    let error = null
    const errorCallback = e => error = e

    await submitUCRequest({
      uc: validateUserPermissionUC,
      params: params,
      errorCallback: errorCallback
    })

    assertErrorType(error, UnauthorizedError)
  })
})

const makeUseCase = _ => {
  const mockUserRepository = {
    getUserByEmail: email => registeredUser.email == email ?
      registeredUser :
      null
  }
  return new ValidateUserPermissionUC({
    userRepository: mockUserRepository
  })
}

const makeParams = ({ email, roleList }) => new ValidateUserPermissionUCParams(email, roleList)