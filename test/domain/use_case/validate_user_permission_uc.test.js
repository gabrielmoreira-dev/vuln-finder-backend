const { ValidateUserPermissionUC, ValidateUserPermissionUCParams } = require('../../../domain/use_case/validate_user_permission_uc')
const { InvalidCredentialsError, UnauthorizedError } = require('../../../domain/errors')
const { submitUCRequest, assertTrue, assertErrorType } = require('../../common/utils')
const UserRepositorySpy = require("../../common/mock/repository/user_repository_spy")

describe("Validate user permission", () => {
  it("Verifies if get user by email is called", async () => {
    const validateUserPermissionUC = makeUseCase(true)
    const params = makeParams({
      email: "user@test.com",
      roleList: ['Customer']
    })

    await submitUCRequest({
      uc: validateUserPermissionUC,
      params: params
    })

    assertTrue(validateUserPermissionUC.userRepository.getUserByEmailIsCalled)
  })

  it("Verifies if throw an user not found exception", async () => {
    const validateUserPermissionUC = makeUseCase(false)
    const params = makeParams({
      email: "user@test.com",
      roleList: ['Customer']
    })
    let error = null
    const errorCallback = e => error = e

    await submitUCRequest({
      uc: validateUserPermissionUC,
      params: params,
      errorCallback: errorCallback
    })

    assertErrorType(error, InvalidCredentialsError)
  })

  it("Verifies if throw an unauthorized exception", async () => {
    const validateUserPermissionUC = makeUseCase(true)
    const params = makeParams({
      email: "user@test.com",
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

const makeUseCase = returnUser => new ValidateUserPermissionUC({
  userRepository: new UserRepositorySpy(returnUser)
})

const makeParams = ({ email, roleList }) => new ValidateUserPermissionUCParams(email, roleList)