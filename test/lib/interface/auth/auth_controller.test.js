const { MissingRequiredParameterError } = require('../../../../domain/errors')
const AuthController = require('../../../../lib/interface/auth/auth_controller')
const { makeRequest, assertErrorType, assertTrue } = require('../../../common/utils')
const UseCaseSpy = require("../../../common/mock/use_case_spy")
const UserBuilder = require("../../../common/data_builder/user_builder")

let authController

beforeAll(() => {
  authController = new AuthController({
    getAccessTokenUC: new UseCaseSpy(),
    insertUserUC: new UseCaseSpy(),
    validateEmailFormatUC: new UseCaseSpy(),
    validatePasswordFormatUC: new UseCaseSpy(),
    validateUserPasswordUC: new UseCaseSpy(),
    validateUserPermissionUC: new UseCaseSpy()
  })
})

describe("Insert user", () => {
  it("Verifies if use cases are called", async () => {
    const user = UserBuilder
      .withName("User")
      .withEmail("user@user.com")
      .withPassword("PASSWORD")
      .withRole("Customer")
      .build()

    const req = makeRequest({ body: user })
    await authController.registerUser(req)

    assertTrue(authController.validateEmailFormatUC.useCaseIsCalled)
    assertTrue(authController.validatePasswordFormatUC.useCaseIsCalled)
    assertTrue(authController.insertUserUC.useCaseIsCalled)
    assertTrue(authController.getAccessTokenUC.useCaseIsCalled)
  })

  it("Verifies if throws a missing parameters error", async () => {
    const user = UserBuilder.build()
    let error

    try {
      const req = makeRequest({ body: user })
      await authController.registerUser(req)
    }
    catch (e) {
      error = e
    }

    assertErrorType(error, MissingRequiredParameterError)
  })
})

describe("Authenticate user", () => {
  it("Verifies if use cases are called", async () => {

    const user = UserBuilder
      .withEmail("user@user.com")
      .withPassword("PASSWORD")
      .withRole("Customer")
      .build()

    const req = makeRequest({ body: user })
    await authController.authenticateUser(req)

    assertTrue(authController.validateEmailFormatUC.useCaseIsCalled)
    assertTrue(authController.validatePasswordFormatUC.useCaseIsCalled)
    assertTrue(authController.validateUserPermissionUC.useCaseIsCalled)
    assertTrue(authController.validateUserPasswordUC.useCaseIsCalled)
    assertTrue(authController.getAccessTokenUC.useCaseIsCalled)
  })

  it("Verifies if throws a missing parameters error", async () => {
    const user = UserBuilder.build()
    let error

    try {
      const req = makeRequest({ body: user })
      await authController.authenticateUser(req)
    }
    catch (e) {
      error = e
    }

    assertErrorType(error, MissingRequiredParameterError)
  })
})
