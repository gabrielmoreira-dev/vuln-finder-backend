const { InsertReportUC, InsertReportUCParams } = require('../../../domain/use_case/insert_report_uc')
const { submitUCRequest, assertTrue } = require('../../common/utils')
const ReportRepositorySpy = require('../../common/mock/repository/report_repository_spy')
const DeviceBuilder = require('../../common/data_builder/device_builder')

describe("Insert report", () => {
  it("Verifies if insert report was called", async () => {
    const insertReportUC = makeUseCase()
    const params = makeParams({
      userId: 'REGISTERED_USER_ID',
      devices: [DeviceBuilder.build()]
    })

    const _ = await submitUCRequest({
      uc: insertReportUC,
      params: params
    })

    assertTrue(insertReportUC.reportRepository.insterReportIsCalled)
  })
})

const makeUseCase = _ => new InsertReportUC({
  reportRepository: new ReportRepositorySpy()
})

const makeParams = ({ userId, devices }) => new InsertReportUCParams({ userId, devices })