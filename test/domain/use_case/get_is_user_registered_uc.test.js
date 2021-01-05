const { GetIsUserRegisteredUC, GetIsUserRegisteredUCParams } = require('../../../domain/use_case/get_is_user_registered_uc')
const { submitRequest, assertTrue, assertFalse } = require('../../test_utils')

const registeredEmail = 'user@test.com'
const unregisteredEmail = 'user2@test.com'

describe('Get is user registered', () => {
  it('Should return true if the user is already registered', async () => {
    const getIsUserRegisteredUC = makeUseCase()
    const params = makeParams({ email: registeredEmail })

    const isUserRegistered = await submitRequest({
      uc: getIsUserRegisteredUC,
      params: params
    })

    assertTrue(isUserRegistered)
  })

  it('Should return false if the user is not yet registered', async () => {
    const getIsUserRegisteredUC = makeUseCase()
    const params = makeParams({ email: unregisteredEmail })

    const isUserRegistered = await submitRequest({
      uc: getIsUserRegisteredUC,
      params: params
    })

    assertFalse(isUserRegistered)
  })
})

const makeUseCase = _ => {
  const mockUserRepository = {
    getUserByEmail: email => {
      return {
        then: _ => email === registeredEmail
      }
    }
  }
  return new GetIsUserRegisteredUC({
    userRepository: mockUserRepository
  })
}

const makeParams = ({ email }) => new GetIsUserRegisteredUCParams(email)