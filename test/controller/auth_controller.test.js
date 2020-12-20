const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const AuthController = require('../../src/controller/auth_controller')
const User = require('../../src/data/model/user')

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
      name: 'Client',
      email: 'client@test.com',
      password: '12345678',
      role: 'Client'
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

  it('Should register a client user', async () => {
    const user = {
      name: 'Client',
      email: 'client@gmail.com',
      password: '12345678',
      role: 'Client'
    }

    const req = { body: user }

    const result = await AuthController.registerUser(req, res)
    const userResult = await User.findOne({ email: 'client@gmail.com' })

    expect(result['token']).toBeDefined()
    expect(result).toEqual({ 'token': accessToken })
    expect(userResult).toBeDefined()
    expect(userResult.role).toBe('Client')
  })

  it('Should register a professional user', async () => {
    const user = {
      name: 'Professional',
      email: 'professional@gmail.com',
      password: '12345678',
      role: 'Professional'
    }

    const req = { body: user }

    const result = await AuthController.registerUser(req, res)
    const userResult = await User.findOne({ email: 'professional@gmail.com' })

    expect(result['token']).toBeDefined()
    expect(result).toEqual({ 'token': accessToken })
    expect(userResult).toBeDefined()
    expect(userResult.role).toBe('Professional')
  })

  it('Should return an user already registered error', async () => {
    const user = {
      name: 'Professional',
      email: 'professional@test.com',
      password: '12345678',
      role: 'Professional'
    }

    const req = { body: user }

    const result = await AuthController.registerUser(req, res)

    expect(result['token']).toBeUndefined()
    expect(result['error']).toBeDefined()
    expect(result).toEqual({ 'error': 'User already registered' })
  })

  it('Should return an invalid password format error', async () => {
    const user = {
      name: 'Professional',
      email: 'professional@gmail.com',
      password: '123456',
      role: 'Professional'
    }

    const req = { body: user }

    const result = await AuthController.registerUser(req, res)

    expect(result['token']).toBeUndefined()
    expect(result['error']).toBeDefined()
    expect(result).toEqual({ 'error': 'Invalid password format' })
  })

})

describe('Authenticate', () => {

  beforeAll(() => {
    User.findOne.mockImplementation(({ email }) => {
      return {
        select: jest.fn().mockImplementation(() => userList.find(user => {
          return user.email === email
        })
        )
      }
    })
  })

  test('Should authenticate a client user', async () => {
    const req = {
      body: {
        email: 'client@test.com',
        password: '12345678',
        role: 'Client'
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

  test('Should not authenticate a client user as professional', async () => {
    const req = {
      body: {
        email: 'client@test.com',
        password: '12345678',
        role: 'Professional'
      }
    }

    const result = await AuthController.authenticateUser(req, res)

    expect(result['token']).toBeUndefined()
    expect(result['error']).toBeDefined()
    expect(result).toEqual({ 'error': 'Invalid permission' })
  })

  test('Should not authenticate a professional user as client', async () => {
    const req = {
      body: {
        email: 'professional@test.com',
        password: '12345678',
        role: 'Client'
      }
    }

    const result = await AuthController.authenticateUser(req, res)

    expect(result['token']).toBeUndefined()
    expect(result['error']).toBeDefined()
    expect(result).toEqual({ 'error': 'Invalid permission' })
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
    expect(result).toEqual({ 'error': 'User not found' })
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
    expect(result).toEqual({ 'error': 'Invalid password' })
  })

})