const { MissingRequiredParameterError } = require('../../../../domain/errors')
const AuthController = require('../../../../lib/interface/auth/auth_controller')
const { assertEquals, submitControllerRequest, assertErrorType } = require('../../../test_utils')

const accessToken = 'ACCESS_TOKEN'
const user = {
  name: 'User',
  email: 'user@test.com',
  password: 'Abc123$#',
  role: 'Customer'
}

describe("Insert user", () => {
  it("Should insert an user an return an access token", async () => {
    const authController = makeController()
    const request = makeRequest(user)

    const receivedToken = await submitControllerRequest({
      func: authController.registerUser,
      request: request
    })

    assertEquals(receivedToken, accessToken)
  })

  it("Should throw an missing required parameter error", async () => {
    const authController = makeController()
    const request = makeRequest({})
    let error = null
    const errorCallback = e => error = e

    const receivedToken = await submitControllerRequest({
      func: authController.registerUser,
      request: request,
      errorCallback: errorCallback
    })

    assertErrorType(error, MissingRequiredParameterError)
  })
})

describe("Authenticate user", () => {
  it("Should authenticate an user an return an access token", async () => {
    const authController = makeController()
    const request = makeRequest(user)

    const receivedToken = await submitControllerRequest({
      func: authController.authenticateUser,
      request: request
    })

    assertEquals(receivedToken, accessToken)
  })

  it("Should throw an missing required parameter error", async () => {
    const authController = makeController()
    const request = makeRequest({})
    let error = null
    const errorCallback = e => error = e

    const receivedToken = await submitControllerRequest({
      func: authController.authenticateUser,
      request: request,
      errorCallback: errorCallback
    })

    assertErrorType(error, MissingRequiredParameterError)
  })
})

const makeController = _ => {
  const mockGetAccessTokenUC = {
    getFuture: _ => accessToken
  }
  const mockInsertUserUC = {
    getFuture: _ => { }
  }
  const mockValidateEmailFormatUC = {
    getFuture: _ => { }
  }
  const mockValidatePasswordFormatUC = {
    getFuture: _ => { }
  }
  const mockValidateUserPasswordUC = {
    getFuture: _ => { }
  }
  const mockValidateUserPermissionUC = {
    getFuture: _ => { }
  }
  return new AuthController({
    getAccessTokenUC: mockGetAccessTokenUC,
    insertUserUC: mockInsertUserUC,
    validateEmailFormatUC: mockValidateEmailFormatUC,
    validatePasswordFormatUC: mockValidatePasswordFormatUC,
    validateUserPasswordUC: mockValidateUserPasswordUC,
    validateUserPermissionUC: mockValidateUserPermissionUC
  })
}

const makeRequest = body => {
  return { body }
}