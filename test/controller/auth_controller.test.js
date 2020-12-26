const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const AuthController = require('../../src/controller/auth_controller')
const User = require('../../src/data/model/user')
const errors = require('../../src/common/errors')

jest.mock('bcryptjs')
jest.mock('jsonwebtoken')
jest.mock('../../src/data/model/user')

const accessToken = 'ACCESSTOKEN'

const res = {
  send: (obj) => obj,
  status: (_) => {
    return {
      send: (obj) => obj
    }
  }
}

let userList

beforeEach(() => {
  userList = [
    {
      id: 1,
      name: 'Customer',
      email: 'customer@test.com',
      password: '12345678',
      role: 'Customer'
    },
    {
      id: 2,
      name: 'Professional',
      email: 'professional@test.com',
      password: '12345678',
      role: 'Professional'
    }
  ]
})

beforeAll(() => {
  bcrypt.compare.mockImplementation((a, b) => a === b)

  jwt.sign.mockImplementation(() => accessToken)
})

describe('Register', () => {

  beforeAll(() => {
    User.findOne.mockImplementation(({ email }) => {
      return userList.find(user => {
        return user.email === email
      })
    })

    User.create.mockImplementation((params) => {
      userList.push({
        id: userList.length + 1,
        name: params.name,
        email: params.email,
        password: params.password,
        role: params.role
      })
      return true
    })
  })

  it('Should register a customer user', async () => {
    const userData = {
      name: 'Customer',
      email: 'customer@gmail.com',
      password: '12345678',
      role: 'Customer'
    }

    const req = { body: userData }

    const result = await AuthController.registerUser(req, res)
    const userResult = await User.findOne({ email: 'customer@gmail.com' })

    expect(result['token']).toBeDefined()
    expect(result).toEqual({ 'token': accessToken })
    expect(userResult).toBeDefined()
    expect(userResult.role).toBe('Customer')
  })

  it('Should register a professional user', async () => {
    const userData = {
      name: 'Professional',
      email: 'professional@gmail.com',
      password: '12345678',
      role: 'Professional'
    }

    const req = { body: userData }

    const result = await AuthController.registerUser(req, res)
    const user = await User.findOne({ email: 'professional@gmail.com' })

    expect(result['token']).toBeDefined()
    expect(result).toEqual({ 'token': accessToken })
    expect(user).toBeDefined()
    expect(user.role).toBe('Professional')
  })

  it('Should return an user already registered error', async () => {
    const userData = {
      name: 'Professional',
      email: 'professional@test.com',
      password: '12345678',
      role: 'Professional'
    }

    const req = { body: userData }

    const result = await AuthController.registerUser(req, res)

    expect(result['token']).toBeUndefined()
    expect(result['error']).toBeDefined()
    expect(result).toEqual({ 'error': errors.userAlreadyRegistered })
  })

  it('Should return an invalid password format error', async () => {
    const userData = {
      name: 'Professional',
      email: 'professional@gmail.com',
      password: '123456',
      role: 'Professional'
    }

    const req = { body: userData }

    const result = await AuthController.registerUser(req, res)

    expect(result['token']).toBeUndefined()
    expect(result['error']).toBeDefined()
    expect(result).toEqual({ 'error': errors.invalidPasswordFormat })
  })

})

describe('Authenticate', () => {

  beforeAll(() => {
    User.findOne.mockImplementation(({ email }) => {
      return {
        select: jest.fn().mockImplementation(
          () => userList.find(user => {
            return user.email === email
          })
        )
      }
    })
  })

  test('Should authenticate a customer user', async () => {
    const req = {
      body: {
        email: 'customer@test.com',
        password: '12345678',
        role: 'Customer'
      }
    }

    const result = await AuthController.authenticateUser(req, res)

    expect(result['token']).toBeDefined()
    expect(result).toEqual({ 'token': accessToken })
  })

  test('Should authenticate a professional user', async () => {
    const req = {
      body: {
        email: 'professional@test.com',
        password: '12345678',
        role: 'Professional'
      }
    }

    const result = await AuthController.authenticateUser(req, res)

    expect(result['token']).toBeDefined()
    expect(result).toEqual({ 'token': accessToken })
  })

  test('Should not authenticate a customer user as professional', async () => {
    const req = {
      body: {
        email: 'customer@test.com',
        password: '12345678',
        role: 'Professional'
      }
    }

    const result = await AuthController.authenticateUser(req, res)

    expect(result['token']).toBeUndefined()
    expect(result['error']).toBeDefined()
    expect(result).toEqual({ 'error': errors.invalidPermission })
  })

  test('Should not authenticate a professional user as customer', async () => {
    const req = {
      body: {
        email: 'professional@test.com',
        password: '12345678',
        role: 'Customer'
      }
    }

    const result = await AuthController.authenticateUser(req, res)

    expect(result['token']).toBeUndefined()
    expect(result['error']).toBeDefined()
    expect(result).toEqual({ 'error': errors.invalidPermission })
  })

  test('Should return an user not found error', async () => {
    const req = {
      body: {
        email: 'professional2@test.com',
        password: '12345678',
        role: 'Professional'
      }
    }

    const result = await AuthController.authenticateUser(req, res)

    expect(result['token']).toBeUndefined()
    expect(result['error']).toBeDefined()
    expect(result).toEqual({ 'error': errors.userNotFound })
  })

  test('Should return an invalid password error', async () => {
    const req = {
      body: {
        email: 'professional@test.com',
        password: '123456789',
        role: 'Professional'
      }
    }

    const result = await AuthController.authenticateUser(req, res)

    expect(result['token']).toBeUndefined()
    expect(result['error']).toBeDefined()
    expect(result).toEqual({ 'error': errors.invalidPassword })
  })

})