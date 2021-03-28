const { InsertConsultancyUC, InsertConsultancyUCParams } = require('../../../domain/use_case/insert_consultancy_uc')
const { submitUCRequest, assertTrue } = require('../../common/utils')
const ConsultancyRepositorySpy = require('../../common/mock/repository/consultancy_repository_spy')

describe("Insert consultancy", () => {
  it("Verifies if insert consultancy was called", async () => {
    const insertConsultancyUC = makeUseCase()
    const params = makeParams({
      customerId: 'CUSTOMER_ID',
      professionalId: 'PROFESSIONAL_ID',
      reportId: 'REPORT_ID',
      createDate: Date()
    })

    const _ = await submitUCRequest({
      uc: insertConsultancyUC,
      params: params
    })

    assertTrue(insertConsultancyUC.consultancyRepository.insterConsultancyIsCalled)
  })
})

const makeUseCase = _ => new InsertConsultancyUC({
  consultancyRepository: new ConsultancyRepositorySpy()
})

const makeParams = ({ customerId, professionalId, reportId, createDate }) =>
  new InsertConsultancyUCParams({ customerId, professionalId, reportId, createDate })