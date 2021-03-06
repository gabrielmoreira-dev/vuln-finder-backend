const { GetProfessionalListUC, GetProfessionalListUCParams } = require("../../../domain/use_case/get_professional_list_uc")
const ProfessionalRepositorySpy = require("../../common/mock/repository/professional_repository_spy")
const { submitUCRequest, assertTrue, assertErrorType } = require("../../common/utils")

describe("Get professional list", () => {
  it("Verifies if get professional list is called", async () => {
    const getProfessionalUC = makeUseCase()
    const params = makeParams({})

    const _ = await submitUCRequest({
      uc: getProfessionalUC,
      params: params
    })

    assertTrue(getProfessionalUC.professionalRepository.getProfessionalListIsCalled)
  })

  it("Verifies if get professional by city is called", async () => {
    const getProfessionalUC = makeUseCase()
    const params = makeParams({ city: "CITY" })

    const _ = await submitUCRequest({
      uc: getProfessionalUC,
      params: params
    })

    assertTrue(getProfessionalUC.professionalRepository.getProfessionalListByCityIsCalled)
  })
})

const makeUseCase = _ => new GetProfessionalListUC({
  professionalRepository: new ProfessionalRepositorySpy(false)
})

const makeParams = ({ city }) => new GetProfessionalListUCParams({ city })