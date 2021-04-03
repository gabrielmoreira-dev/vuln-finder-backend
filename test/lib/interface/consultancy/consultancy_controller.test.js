const ConsultancyController = require('../../../../lib/interface/consultancy/consultancy_controller')
const { MissingRequiredParameterError } = require('../../../../domain/errors')
const { makeRequest, assertTrue, assertErrorType } = require("../../../common/utils")
const UseCaseSpy = require("../../../common/mock/use_case_spy")
const CustomerBuilder = require('../../../common/data_builder/customer_builder')

const consultancyController = new ConsultancyController({
  getCustomerUC: new UseCaseSpy(CustomerBuilder.withId('CUSTOMER_ID').build()),
  insertConsultancyUC: new UseCaseSpy()
})

const body = {
  professionalId: 'PROFESSIONAL_ID',
  reportId: 'REPORT_ID'
}

describe("Insert consultancy", () => {
  it("Verifies if get customer uc is called", async () => {
    const userId = "USER_ID"

    const req = makeRequest({ userId, body })
    await consultancyController.insertConsultancy(req)

    assertTrue(consultancyController.getCustomerUC.useCaseIsCalled)
  })

  it("Verifies if insert consultancy uc is called", async () => {
    const userId = "USER_ID"

    const req = makeRequest({ userId, body })
    await consultancyController.insertConsultancy(req)

    assertTrue(consultancyController.insertConsultancyUC.useCaseIsCalled)
  })

  it("Verifies if throws a missing parameter error", async () => {
    let error

    const req = makeRequest({ body })
    try {
      await consultancyController.insertConsultancy(req)
    }
    catch (e) {
      error = e
    }

    assertErrorType(error, MissingRequiredParameterError)
  })
})