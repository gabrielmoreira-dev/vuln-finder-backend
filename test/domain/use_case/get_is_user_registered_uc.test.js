const { GetIsUserRegisteredUC, GetIsUserRegisteredUCParams } = require('../../../domain/use_case/get_is_user_registered_uc')
const { submitRequest, assertTrue, assertFalse } = require('../../test_utils')

describe.only('Get is user registered', () => {
  it('Should return true if the user is already registered', async () => {
    const getIsUserRegisteredUC = makeUseCase({ isUserRegistered: true })
    const params = makeParams()

    const isUserRegistered = await submitRequest({
      uc: getIsUserRegisteredUC,
      params: params
    })

    assertTrue(isUserRegistered)
  })

  it('Should return false if the user is not yet registered', async () => {
    const getIsUserRegisteredUC = makeUseCase({ isUserRegistered: false })
    const params = makeParams()

    const isUserRegistered = await submitRequest({
      uc: getIsUserRegisteredUC,
      params: params
    })

    assertFalse(isUserRegistered)
  })
})

const makeUseCase = ({ isUserRegistered }) => {
  const mockUserRepository = {
    getUserByEmail: _ => {
      return {
        then: _ => isUserRegistered
      }
    }
  }
  return new GetIsUserRegisteredUC({
    userRepository: mockUserRepository
  })
}

const makeParams = _ => new GetIsUserRegisteredUCParams({
  email: 'user@test.com'
})