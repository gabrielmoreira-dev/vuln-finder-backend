const jwt = require('jsonwebtoken')
jest.mock('jsonwebtoken')

const { GetAccessTokenUC, GetAccessTokenUCParams } = require('../../../domain/use_case/get_access_token_uc')
const { InvalidCredentialsError } = require('../../../domain/errors')
const { submitUCRequest, assertTrue, assertErrorType } = require('../../common/utils')
const UserRepositorySpy = require("../../common/mock/repository/user_repository_spy")

beforeAll(() => {
  jwt.sign.mockImplementation(() => { })
})

describe("Get access token", () => {
  it("Verifies if get user is called", async () => {
    const getAccessTokenUC = makeUseCase(true)
    const params = makeParams({ email: "user@test.com" })

    const _ = await submitUCRequest({
      uc: getAccessTokenUC,
      params: params
    })

    assertTrue(getAccessTokenUC.userRepository.getUserByEmailIsCalled)
  })

  it("Verifies if throw an user not found error", async () => {
    const getAccessTokenUC = makeUseCase(false)
    const params = makeParams({ email: "user@test.com" })
    let error = null

    const _ = await submitUCRequest({
      uc: getAccessTokenUC,
      params: params,
      errorCallback: (e) => error = e
    })

    assertErrorType(error, InvalidCredentialsError)
  })
})

const makeUseCase = returnUser => new GetAccessTokenUC({
  userRepository: new UserRepositorySpy(returnUser)
})

const makeParams = ({ email }) => new GetAccessTokenUCParams(email)