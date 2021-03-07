const CustomerController = require('../../../../lib/interface/customer/customer_controller')
const { MissingRequiredParameterError } = require('../../../../domain/errors')
const { makeRequest, assertTrue, assertErrorType } = require("../../../common/utils")
const UseCaseSpy = require("../../../common/mock/use_case_spy")
const CustomerBuilder = require("../../../common/data_builder/customer_builder")

const customerController = new CustomerController({
  upsertCustomerUC: new UseCaseSpy(),
  getCustomerUC: new UseCaseSpy()
})

describe("Upsert customer", () => {
  it("Verifies if upsert customer uc is called", async () => {
    const userId = "USER_ID"
    const customer = CustomerBuilder.build()

    const req = makeRequest({ userId, body: customer })
    await customerController.upsertCustomer(req)

    assertTrue(customerController.upsertCustomerUC.useCaseIsCalled)
  })

  it("Verifies if throws a missing parameter error", async () => {
    const customer = CustomerBuilder.build()
    let error

    const req = makeRequest({ body: customer })
    try {
      await customerController.upsertCustomer(req)
    }
    catch (e) {
      error = e
    }

    assertErrorType(error, MissingRequiredParameterError)
  })
})

describe("Get customer", () => {
  it("Verifies if get customer uc is called", async () => {
    const userId = "USER_ID"

    const req = makeRequest({ userId })
    await customerController.getCustomer(req)

    assertTrue(customerController.getCustomerUC.useCaseIsCalled)
  })

  it("Verifies if throws a missing parameter error", async () => {
    let error

    const req = makeRequest({})
    try {
      await customerController.getCustomer(req)
    }
    catch (e) {
      error = e
    }

    assertErrorType(error, MissingRequiredParameterError)
  })
})

describe("Get customer by id", () => {
  it("Verifies if get customer uc is called", async () => {
    const id = "USER_ID"

    const req = makeRequest({ id })
    await customerController.getCustomerById(req)

    assertTrue(customerController.getCustomerUC.useCaseIsCalled)
  })

  it("Verifies if throws a missing parameter error", async () => {
    let error

    const req = makeRequest({})
    try {
      await customerController.getCustomerById(req)
    }
    catch (e) {
      error = e
    }

    assertErrorType(error, MissingRequiredParameterError)
  })
})