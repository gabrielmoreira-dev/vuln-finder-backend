const jwt = require('jsonwebtoken')
jest.mock('jsonwebtoken')

const SecurityPreHandler = require('../../../../lib/interface/common/security_pre_handler')
const { InvalidAccessTokenError, NoAccessTokenProvidedError, MalformattedTokenError, InvalidAuthenticationMethodError } = require('../../../../domain/errors')
const { registeredUser, assertEquals, submitControllerRequest, assertErrorType } = require('../../../test_utils')

const accessToken = 'Bearer 1a2b3c456789'
const invalidToken = 'Bearer 1a2b3c455555'
const invalidFormatToken = '1a2b3c456789'
const invalidMethodToken = 'Bearer1 1a2b3c456789'

beforeAll(() => {
  jwt.verify.mockImplementation((token, _, __) => {
    if (accessToken.split(' ')[1] == token) {
      return {
        id: registeredUser.id,
        role: registeredUser.role
      }
    }
    else {
      throw new InvalidAccessTokenError()
    }
  })
})

describe("Check if the user is authenticated", () => {
  it("Should check user is authenticated", async () => {
    const req = makeAuthorizationRequest(accessToken)

    const result = await submitControllerRequest({
      func: SecurityPreHandler.checkUserIsAuthenticated,
      request: req
    })

    assertEquals(result.id, registeredUser.id)
  })

  it('Should throw an invalid token error', async () => {
    const req = makeAuthorizationRequest(invalidToken)
    let error = null
    const errorCallback = e => error = e

    const result = await submitControllerRequest({
      func: SecurityPreHandler.checkUserIsAuthenticated,
      request: req,
      errorCallback: errorCallback
    })

    assertErrorType(error, InvalidAccessTokenError)
  })

  it('Should throw a no authentication token provided error', async () => {
    const req = makeAuthorizationRequest(null)
    let error = null
    const errorCallback = e => error = e

    const result = await submitControllerRequest({
      func: SecurityPreHandler.checkUserIsAuthenticated,
      request: req,
      errorCallback: errorCallback
    })

    assertErrorType(error, NoAccessTokenProvidedError)
  })

  it('Should throw a malformatted token error', async () => {
    const req = makeAuthorizationRequest(invalidFormatToken)
    let error = null
    const errorCallback = e => error = e

    const result = await submitControllerRequest({
      func: SecurityPreHandler.checkUserIsAuthenticated,
      request: req,
      errorCallback: errorCallback
    })

    assertErrorType(error, MalformattedTokenError)
  })

  it('Should return an invalid authentication method error', async () => {
    const req = makeAuthorizationRequest(invalidMethodToken)
    let error = null
    const errorCallback = e => error = e

    const result = await submitControllerRequest({
      func: SecurityPreHandler.checkUserIsAuthenticated,
      request: req,
      errorCallback: errorCallback
    })

    assertErrorType(error, InvalidAuthenticationMethodError)
  })
})

const makeAuthorizationRequest = token => {
  return {
    headers: { authorization: token }
  }
}