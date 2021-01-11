const jwt = require('jsonwebtoken')
jest.mock('jsonwebtoken')

const SecurityPreHandler = require('../../../../lib/interface/common/security_pre_handler')
const { InvalidAccessTokenError, NoAccessTokenProvidedError, MalformattedTokenError, InvalidAuthenticationMethodError, UnauthorizedError } = require('../../../../domain/errors')
const { registeredUser, assertEquals, assertErrorType, assertNull, submitAuthorizationRequest } = require('../../../test_utils')

const accessToken = 'Bearer 1a2b3c456789'
const invalidToken = 'Bearer 1a2b3c455555'
const invalidFormatToken = '1a2b3c456789'
const invalidMethodToken = 'Bearer1 1a2b3c456789'
const next = () => {
  return {
    id: registeredUser.id
  }
}

beforeAll(() => {
  jwt.verify.mockImplementation((token, _, __) => {
    if (accessToken.split(' ')[1] == token) {
      return {}
    }
    else {
      throw new InvalidAccessTokenError()
    }
  })
})

describe("Check if the user is authenticated", () => {
  it("Should check user is authenticated", async () => {
    let req = makeAuthenticationRequest(accessToken)

    const result = await submitAuthorizationRequest({
      func: SecurityPreHandler.checkUserIsAuthenticated,
      request: req,
      next: next
    })

    assertEquals(result.id, registeredUser.id)
  })

  it('Should throw an invalid token error', async () => {
    const req = makeAuthenticationRequest(invalidToken)
    let error = null
    const errorCallback = e => error = e

    const result = await submitAuthorizationRequest({
      func: SecurityPreHandler.checkUserIsAuthenticated,
      request: req,
      errorCallback: errorCallback
    })

    assertErrorType(error, InvalidAccessTokenError)
  })

  it('Should throw a no authentication token provided error', async () => {
    const req = makeAuthenticationRequest(null)
    let error = null
    const errorCallback = e => error = e

    const result = await submitAuthorizationRequest({
      func: SecurityPreHandler.checkUserIsAuthenticated,
      request: req,
      errorCallback: errorCallback
    })

    assertErrorType(error, NoAccessTokenProvidedError)
  })

  it('Should throw a malformatted token error', async () => {
    const req = makeAuthenticationRequest(invalidFormatToken)
    let error = null
    const errorCallback = e => error = e

    const result = await submitAuthorizationRequest({
      func: SecurityPreHandler.checkUserIsAuthenticated,
      request: req,
      errorCallback: errorCallback
    })

    assertErrorType(error, MalformattedTokenError)
  })

  it('Should return an invalid authentication method error', async () => {
    const req = makeAuthenticationRequest(invalidMethodToken)
    let error = null
    const errorCallback = e => error = e

    const result = await submitAuthorizationRequest({
      func: SecurityPreHandler.checkUserIsAuthenticated,
      request: req,
      errorCallback: errorCallback
    })

    assertErrorType(error, InvalidAuthenticationMethodError)
  })
})

describe("Check if the user is authorized", () => {
  it('Should authorize a customer user in a customer exclusive service', async () => {
    const req = makeAuthorizationRequest('Customer')
    let error = null
    const errorCallback = e => error = e

    const result = await submitAuthorizationRequest({
      func: SecurityPreHandler.checkUserIsAuthorized(['Customer']),
      request: req,
      errorCallback: errorCallback
    })

    assertNull(error)
  })

  it('Should authorize a professional user in a professional exclusive service', async () => {
    const req = makeAuthorizationRequest('Professional')
    let error = null
    const errorCallback = e => error = e

    const result = await submitAuthorizationRequest({
      func: SecurityPreHandler.checkUserIsAuthorized(['Professional']),
      request: req,
      errorCallback: errorCallback
    })

    assertNull(error)
  })

  it('Should not authorize a customer user in a professional exclusive service', async () => {
    const req = makeAuthorizationRequest('Customer')
    let error = null
    const errorCallback = e => error = e

    const result = await submitAuthorizationRequest({
      func: SecurityPreHandler.checkUserIsAuthorized(['Professional']),
      request: req,
      errorCallback: errorCallback
    })

    assertErrorType(error, UnauthorizedError)
  })

  it('Should not authorize a professional user in a customer exclusive service', async () => {
    const req = makeAuthorizationRequest('Professional')
    let error = null
    const errorCallback = e => error = e

    const result = await submitAuthorizationRequest({
      func: SecurityPreHandler.checkUserIsAuthorized(['Customer']),
      request: req,
      errorCallback: errorCallback
    })

    assertErrorType(error, UnauthorizedError)
  })
})

const makeAuthenticationRequest = token => {
  return {
    headers: { authorization: token }
  }
}

const makeAuthorizationRequest = role => {
  return {
    user: { role: role }
  }
}