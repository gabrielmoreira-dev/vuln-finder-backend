const { UpsertCustomerUC, UpsertCustomerUCParams } = require('../../../domain/use_case/upsert_customer_uc')
const { submitUCRequest, assertTrue } = require('../../common/utils')
const CustomerBuilder = require("../../common/data_builder/customer_builder")
const CustomerRepositorySpy = require("../../common/mock/repository/customer_repository_spy")

describe("Upsert customer", () => {
  it("Verifies if upsert customer was called", async () => {
    const upsertCustomerUC = makeUseCase(false)
    const params = makeParams({
      userId: 'UNREGISTERED_USER_ID',
      customer: CustomerBuilder.build()
    })

    const _ = await submitUCRequest({
      uc: upsertCustomerUC,
      params: params
    })

    assertTrue(upsertCustomerUC.customerRepository.upsertCustomerIsCalled)
  })
})

const makeUseCase = returnCustomer => new UpsertCustomerUC({
  customerRepository: new CustomerRepositorySpy(returnCustomer)
})

const makeParams = ({ userId, customer }) => new UpsertCustomerUCParams({ userId, customer })