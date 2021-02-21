const { UpsertProfessionalUC, UpsertProfessionalUCParams } = require("../../../domain/use_case/upsert_professional_uc")
const { submitUCRequest, assertTrue } = require("../../test_utils")
const ProfessionalBuilder = require("../../common/data_builder/professional_builder")
const MockProfessionalRepository = require("../../common/mock/repository/mock_professional_repository")

describe.only("Upsert professional", () => {
  it("Verify if repository was called", async () => {
    const upsertProfessionalUC = makeUseCase()
    const params = makeParams({
      userId: 'REGISTERED_USER_ID',
      professional: ProfessionalBuilder.build()
    })

    const _ = await submitUCRequest({
      uc: upsertProfessionalUC,
      params: params
    })

    assertTrue(upsertProfessionalUC.professionalRepository.isUpsertProfessionalCalled)
  })
})

const makeUseCase = _ => {
  return new UpsertProfessionalUC({
    professionalRepository: new MockProfessionalRepository()
  })
}

const makeParams = ({ userId, professional }) => new UpsertProfessionalUCParams(userId, professional)