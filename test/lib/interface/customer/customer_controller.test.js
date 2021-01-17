const CustomerController = require('../../../../lib/interface/customer/customer_controller')
const { MissingRequiredParameterError } = require('../../../../domain/errors')
const { registeredUser, submitControllerRequest, assertEquals, assertErrorType } = require("../../../test_utils")

const customer = {
  customer: {
    address: {},
    phone: '99999999'
  }
}

describe("Upsert customer", () => {
  it("Should update a customer", async () => {
    const customerController = makeController(customer)
    const request = makeRequest({
      userId: registeredUser.id,
      body: customer
    })

    const result = await submitControllerRequest({
      func: customerController.upsertCustomer,
      request: request
    })

    assertEquals(result, customer)
  })

  it("Should throw a missing required parameter error", async () => {
    const customerController = makeController(customer)
    const request = makeRequest({})
    let error = null
    const errorCallback = e => error = e

    const result = await submitControllerRequest({
      func: customerController.upsertCustomer,
      request: request,
      errorCallback: errorCallback
    })

    assertErrorType(error, MissingRequiredParameterError)
  })
})

describe("Get customer", () => {
  it('Should return a customer', async () => {
    const customerController = makeController(customer)
    const request = makeRequest({ userId: registeredUser.id })

    const result = await submitControllerRequest({
      func: customerController.getCustomer,
      request: request
    })

    assertEquals(result, customer)
  })

  it("Should throw a missing required parameter error", async () => {
    const customerController = makeController(customer)
    const request = makeRequest({})
    let error = null
    const errorCallback = e => error = e

    const result = await submitControllerRequest({
      func: customerController.getCustomer,
      request: request,
      errorCallback: errorCallback
    })

    assertErrorType(error, MissingRequiredParameterError)
  })
})

describe("Get customer by id", () => {
  it('Should return a customer', async () => {
    const customerController = makeController(customer)
    const request = makeRequest({ id: 'CUSTOMER_ID' })

    const result = await submitControllerRequest({
      func: customerController.getCustomerById,
      request: request
    })

    assertEquals(result, customer)
  })

  it("Should throw a missing required parameter error", async () => {
    const customerController = makeController(customer)
    const request = makeRequest({})
    let error = null
    const errorCallback = e => error = e

    const result = await submitControllerRequest({
      func: customerController.getCustomerById,
      request: request,
      errorCallback: errorCallback
    })

    assertErrorType(error, MissingRequiredParameterError)
  })
})

const makeController = customer => {
  const mockUpsertCustomerUC = {
    getFuture: _ => customer
  }
  const mockGetCustomerUC = {
    getFuture: _ => customer
  }
  return new CustomerController({
    upsertCustomerUC: mockUpsertCustomerUC,
    getCustomerUC: mockGetCustomerUC
  })
}

const makeRequest = ({ userId, id, body }) => {
  return {
    user: {
      id: userId
    },
    params: {
      id: id
    },
    body: body
  }
}