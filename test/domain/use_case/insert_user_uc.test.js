const bcrypt = require('bcryptjs')
jest.mock('bcryptjs')

const { UserAlreadyRegisteredError } = require('../../../domain/errors')
const { InsertUserUC, InsertUserUCParams } = require('../../../domain/use_case/insert_user_uc')
const { registeredUser, unregisteredUser, submitUCRequest, assertNull, assertErrorType, assertHaveBeenCalled } = require('../../test_utils')

beforeAll(() => {
  bcrypt.hash.mockImplementation(() => '')
})

describe("Insert user", () => {
  it("Should insert an user", async () => {
    const insertUserUC = makeUseCase()
    const params = makeParams({
      name: unregisteredUser.name,
      email: unregisteredUser.email,
      password: unregisteredUser.password,
      role: unregisteredUser.role
    })
    let error = null
    const errorCallback = e => error = e

    await submitUCRequest({
      uc: insertUserUC,
      params: params,
      errorCallback: errorCallback
    })

    assertHaveBeenCalled(bcrypt.hash)
    assertNull(error)
  })

  it("Should throw an already registered user error", async () => {
    const insertUserUC = makeUseCase()
    const params = makeParams({
      name: registeredUser.name,
      email: registeredUser.email,
      password: registeredUser.password,
      role: registeredUser.role
    })
    let error = null
    const errorCallback = e => error = e

    await submitUCRequest({
      uc: insertUserUC,
      params: params,
      errorCallback: errorCallback
    })

    assertErrorType(error, UserAlreadyRegisteredError)
  })
})

const makeUseCase = _ => {
  const mockUserRepository = {
    insertUser: (_, __, ___, ____) => { },
    getUserByEmail: email => registeredUser.email == email ?
      registeredUser :
      null
  }
  return new InsertUserUC({
    userRepository: mockUserRepository
  })
}

const makeParams = ({
  name,
  email,
  password,
  role
}) => new InsertUserUCParams(name, email, password, role)