const ReportController = require('../../../../lib/interface/report/report_controller')
const { MissingRequiredParameterError } = require('../../../../domain/errors')
const { makeRequest, assertTrue, assertErrorType } = require("../../../common/utils")
const UseCaseSpy = require("../../../common/mock/use_case_spy")
const DeviceBuilder = require('../../../common/data_builder/device_builder')

const reportController = new ReportController({
  insertReportUC: new UseCaseSpy()
})

const body = {
  devices: [
    DeviceBuilder.build()
  ]
}

describe("Insert report", () => {
  it("Verifies if insert report uc is called", async () => {
    const userId = "USER_ID"

    const req = makeRequest({ userId, body })
    await reportController.insertReport(req)

    assertTrue(reportController.insertReportUC.useCaseIsCalled)
  })

  it("Verifies if throws a missing parameter error", async () => {
    let error

    const req = makeRequest({ body })
    try {
      await reportController.insertReport(req)
    }
    catch (e) {
      error = e
    }

    assertErrorType(error, MissingRequiredParameterError)
  })
})