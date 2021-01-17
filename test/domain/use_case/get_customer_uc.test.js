const { GetCustomerUC, GetCustomerUCParams } = require('../../../domain/use_case/get_customer_uc')
const { CustomerNotFoundError, MissingRequiredParameterError } = require('../../../domain/errors')
const { registeredCustomer, submitUCRequest, assertEquals, assertErrorType } = require('../../test_utils')

describe("Get customer", () => {
  it("Should return a customer by id", async () => {
    const getCustomerUC = makeUseCase(registeredCustomer)
    const params = makeParams({ id: registeredCustomer.id })

    const customer = await submitUCRequest({
      uc: getCustomerUC,
      params: params
    })

    assertEquals(customer, registeredCustomer)
  })

  it("Should return a customer by user id", async () => {
    const getCustomerUC = makeUseCase(registeredCustomer)
    const params = makeParams({ userId: registeredCustomer.user.id })

    const customer = await submitUCRequest({
      uc: getCustomerUC,
      params: params
    })

    assertEquals(customer, registeredCustomer)
  })

  it("Should throw a customer not found error", async () => {
    const getCustomerUC = makeUseCase(registeredCustomer)
    const params = makeParams({ userId: 'UNREGISTERED_USER_ID' })
    let error = null
    const errorCallback = e => error = e

    const customer = await submitUCRequest({
      uc: getCustomerUC,
      params: params,
      errorCallback: errorCallback
    })

    assertErrorType(error, CustomerNotFoundError)
  })

  it("Should throw an missing required parameters error", async () => {
    const getCustomerUC = makeUseCase(registeredCustomer)
    const params = makeParams({})
    let error = null
    const errorCallback = e => error = e

    const customer = await submitUCRequest({
      uc: getCustomerUC,
      params: params,
      errorCallback: errorCallback
    })

    assertErrorType(error, MissingRequiredParameterError)
  })
})

const makeUseCase = customer => {
  const mockCustomerRepository = {
    getCustomerById: id => customer.id === id ? customer : null,

    getCustomerByUserId: userId => customer.user.id === userId ? customer : null
  }
  return new GetCustomerUC({
    customerRepository: mockCustomerRepository
  })
}

const makeParams = ({ id, userId }) => new GetCustomerUCParams({ id, userId })