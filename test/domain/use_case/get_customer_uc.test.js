const { GetCustomerUC, GetCustomerUCParams } = require('../../../domain/use_case/get_customer_uc')
const { MissingRequiredParameterError, CustomerNotFoundError } = require('../../../domain/errors')
const { submitUCRequest, assertTrue, assertErrorType } = require('../../common/utils')
const CustomerRepositorySpy = require("../../common/mock/repository/customer_repository_spy")

describe("Get customer", () => {
  it("Verifies if get customer by id is called", async () => {
    const getCustomerUC = makeUseCase(true)
    const params = makeParams({ id: "CUSTOMER_ID" })

    const _ = await submitUCRequest({
      uc: getCustomerUC,
      params: params
    })

    assertTrue(getCustomerUC.customerRepository.getCustomerByIdIsCalled)
  })

  it("Verifies if get customer by user id is called", async () => {
    const getCustomerUC = makeUseCase(true)
    const params = makeParams({ userId: "USER_ID" })

    const _ = await submitUCRequest({
      uc: getCustomerUC,
      params: params
    })

    assertTrue(getCustomerUC.customerRepository.getCustomerByUserIdIsCalled)
  })

  it("Verifies if throws a missing parameter error", async () => {
    const getCustomerUC = makeUseCase(true)
    const params = makeParams({})
    let error = null

    const _ = await submitUCRequest({
      uc: getCustomerUC,
      params: params,
      errorCallback: (e) => error = e
    })

    assertErrorType(error, MissingRequiredParameterError)
  })

  it("Verifies if throws a customer not found error", async () => {
    const getCustomerUC = makeUseCase(false)
    const params = makeParams({ userId: "USER_ID" })
    let error = null

    const _ = await submitUCRequest({
      uc: getCustomerUC,
      params: params,
      errorCallback: (e) => error = e
    })

    assertErrorType(error, CustomerNotFoundError)
  })
})

const makeUseCase = returnCustomer => new GetCustomerUC({
  customerRepository: new CustomerRepositorySpy(returnCustomer)
})


const makeParams = ({ id, userId }) => new GetCustomerUCParams({ id, userId })