const jwt = require('jsonwebtoken')

const authenticate = require('../../src/middleware/authenticate')
const errors = require('../../src/common/errors')

const accessToken = 'Bearer 1a2b3c456789'
const wrongToken = 'Bearer 1a2b3c455555'
const wrongFormatToken = '1a2b3c456789'
const wrongBearerToken = 'Bearer1 1a2b3c456789'

jest.mock('jsonwebtoken')

const res = {
  send: (obj) => obj,
  status: (_) => {
    return {
      send: (obj) => obj
    }
  }
}

const next = () => {
  return {
    status: 200
  }
}

beforeAll(() => {
  jwt.verify.mockImplementation((token, __, callback) => {
    if (accessToken.split(' ')[1] == token) {
      return callback(null, {
        id: '123',
        role: 'doctor'
      })
    }
    else {
      return callback(Error(), {})
    }
  })
})

describe('Authenticate', () => {

  it('Should authenticate an user', async () => {

    const req = {
      headers: {
        authorization: accessToken
      }
    }

    const result = await authenticate(req, res, next)

    expect(result['status']).toBeDefined()
    expect(result).toEqual({ 'status': 200 })

  })

  it('Should return invalid token error', async () => {

    const req = {
      headers: {
        authorization: wrongToken
      }

    }
    const result = await authenticate(req, res, next)

    expect(result['error']).toBeDefined()
    expect(result).toEqual({ 'error': errors.invalidToken })

  })

  it('Should return no authentication token provided error', async () => {
    const req = {
      headers: {
        authorization: null
      }
    }

    const result = await authenticate(req, res, next)

    expect(result['error']).toBeDefined()
    expect(result).toEqual({ 'error': errors.noAuthenticationTokenProvided })
  })

  it('Should return malformatted token error', async () => {
    const req = {
      headers: {
        authorization: wrongFormatToken
      }
    }

    const result = await authenticate(req, res, next)

    expect(result['error']).toBeDefined()
    expect(result).toEqual({ 'error': errors.malformattedToken })
  })

  it('Should return invalid authentication method error', async () => {
    const req = {
      headers: {
        authorization: wrongBearerToken
      }
    }
    const result = await authenticate(req, res, next)

    expect(result['error']).toBeDefined()
    expect(result).toEqual({ 'error': errors.invalidAuthenticationMethod })
  })

})