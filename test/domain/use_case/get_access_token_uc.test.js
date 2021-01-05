const jwt = require('jsonwebtoken')
jest.mock('jsonwebtoken')

const { GetAccessTokenUC, GetAccessTokenUCParams } = require('../../../domain/use_case/get_access_token_uc')
const { submitRequest, assertEquals } = require('../../test_utils')

const id = 'TEST_ID'
const role = 'Client'
const accessToken = 'ACCESS_TOKEN'

beforeAll(() => {
  jwt.sign.mockImplementation(() => accessToken)
})

describe("Get access token", () => {
  it("Shoult return an access token", async () => {
    const getAccessTokenUC = makeUseCase()
    const params = makeParams({
      id: id,
      role: role,
    })

    const receivedToken = await submitRequest({
      uc: getAccessTokenUC,
      params: params
    })

    assertEquals(receivedToken, accessToken)
  })
})

const makeUseCase = _ => new GetAccessTokenUC()

const makeParams = ({ id, role }) => new GetAccessTokenUCParams(id, role)