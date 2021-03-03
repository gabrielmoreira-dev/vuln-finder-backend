const { UpsertProfessionalUC, UpsertProfessionalUCParams } = require("../../../domain/use_case/upsert_professional_uc")
const { submitUCRequest, assertTrue } = require("../../common/utils")
const ProfessionalBuilder = require("../../common/data_builder/professional_builder")
const ProfessionalRepositorySpy = require("../../common/mock/repository/professional_repository_spy")

describe("Upsert professional", () => {
  it("Verifies if upsertProfessional was called", async () => {
    const upsertProfessionalUC = makeUseCase(false)
    const params = makeParams({
      userId: 'REGISTERED_USER_ID',
      professional: ProfessionalBuilder.build()
    })

    const _ = await submitUCRequest({
      uc: upsertProfessionalUC,
      params: params
    })

    assertTrue(upsertProfessionalUC.professionalRepository.upsertProfessionalIsCalled)
  })
})

const makeUseCase = returnProfessional => new UpsertProfessionalUC({
  professionalRepository: new ProfessionalRepositorySpy(returnProfessional)
})

const makeParams = ({ userId, professional }) => new UpsertProfessionalUCParams(userId, professional)