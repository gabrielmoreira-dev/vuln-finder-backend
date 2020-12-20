const authorize = require('../../src/middleware/authorize')
const errors = require('../../src/common/errors')

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

describe('Authorize', () => {

  it('Should authorize a client user in a client exclusive service', () => {
    const req = {
      user: {
        role: 'Client'
      }
    }

    const authorizeUser = authorize(['Client'])

    const result = authorizeUser(req, res, next)

    expect(result['status']).toBeDefined()
    expect(result).toEqual({ 'status': 200 })
  })

  it('Should authorize a professional user in a professional exclusive service', () => {
    const req = {
      user: {
        role: 'Professional'
      }
    }

    const authorizeUser = authorize(['Professional'])

    const result = authorizeUser(req, res, next)

    expect(result['status']).toBeDefined()
    expect(result).toEqual({ 'status': 200 })
  })

  it('Should not authorize a client user in a professional exclusive service', () => {
    const req = {
      user: {
        role: 'Client'
      }
    }

    const authorizeUser = authorize(['Professional'])

    const result = authorizeUser(req, res, next)

    expect(result['error']).toBeDefined()
    expect(result).toEqual({ 'error': errors.unauthorized })
  })

  it('Should not authorize a professional user in a client exclusive service', () => {
    const req = {
      user: {
        role: 'Professional'
      }
    }

    const authorizeUser = authorize(['Client'])

    const result = authorizeUser(req, res, next)

    expect(result['error']).toBeDefined()
    expect(result).toEqual({ 'error': errors.unauthorized })
  })

})