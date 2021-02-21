const { UpsertCustomerUC, UpsertCustomerUCParams } = require('../../../domain/use_case/upsert_customer_uc')
const { customerList, submitUCRequest, assertContains } = require('../../test_utils')
const CustomerBuilder = require("../../common/data_builder/customer_builder")

describe("Upsert customer", () => {
  it("Should insert a costumer", async () => {
    const upsertCustomerUC = makeUseCase()
    const params = makeParams({
      userId: 'UNREGISTERED_USER_ID',
      customer: CustomerBuilder.build()
    })

    const customer = await submitUCRequest({
      uc: upsertCustomerUC,
      params: params
    })

    assertContains(customer, customerList)
  })

  it("Should update a costumer", async () => {
    const upsertCustomerUC = makeUseCase()
    const params = makeParams({
      userId: 'REGISTERED_USER_ID',
      customer: {
        address: {},
        phone: '99999999'
      }
    })

    const customer = await submitUCRequest({
      uc: upsertCustomerUC,
      params: params
    })

    assertContains(customer, customerList)
  })
})

const makeUseCase = _ => {
  const mockCustomerRepository = {
    upsertCustomer: (userId, customer) => {
      const index = customerList.findIndex(customer => customer.user.id === userId)
      if (index === -1) {
        customerList.push(customer)
      }
      else {
        customerList[index] = customer
      }
      return customer
    }
  }
  return new UpsertCustomerUC({
    customerRepository: mockCustomerRepository
  })
}

const makeParams = ({ userId, customer }) => new UpsertCustomerUCParams(userId, customer)