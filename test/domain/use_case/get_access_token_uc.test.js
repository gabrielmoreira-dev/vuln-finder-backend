const jwt = require('jsonwebtoken')
jest.mock('jsonwebtoken')

const { GetAccessTokenUC, GetAccessTokenUCParams } = require('../../../domain/use_case/get_access_token_uc')
const { UserNotFoundError } = require('../../../domain/errors')
const { registeredUser: user, submitUCRequest, assertEquals, assertErrorType } = require('../../test_utils')

const accessToken = 'ACCESS_TOKEN'

beforeAll(() => {
  jwt.sign.mockImplementation(() => accessToken)
})

describe("Get access token", () => {
  it("Shoult return an access token", async () => {
    const getAccessTokenUC = makeUseCase(user)
    const params = makeParams({ email: user.email })

    const receivedToken = await submitUCRequest({
      uc: getAccessTokenUC,
      params: params
    })

    assertEquals(receivedToken, accessToken)
  })

  it("Should throw an user not found error", async () => {
    const getAccessTokenUC = makeUseCase(null)
    const params = makeParams({ email: user.email })
    let error = null
    const errorCallback = e => error = e

    const receivedToken = await submitUCRequest({
      uc: getAccessTokenUC,
      params: params,
      errorCallback: errorCallback
    })

    assertErrorType(error, UserNotFoundError)
  })
})

const makeUseCase = user => {
  const mockUserRepository = {
    getUserByEmail: _ => user
  }
  return new GetAccessTokenUC({
    userRepository: mockUserRepository
  })
}

const makeParams = ({ email }) => new GetAccessTokenUCParams(email)