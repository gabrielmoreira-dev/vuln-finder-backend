const { GetProfessionalUC, GetProfessionalUCParams } = require("../../../domain/use_case/get_professional_uc")
const ProfessionalRepositorySpy = require("../../common/mock/repository/professional_repository_spy")
const { MissingRequiredParameterError, ProfessionalNotFoundError } = require("../../../domain/errors")
const { submitUCRequest, assertTrue, assertErrorType } = require("../../common/utils")

describe("Get professional", () => {
  it("Verifies if get professional by id is called", async () => {
    const getProfessionalUC = makeUseCase(true)
    const params = makeParams({ id: "PROFESSIONAL_ID" })

    const _ = await submitUCRequest({
      uc: getProfessionalUC,
      params: params
    })

    assertTrue(getProfessionalUC.professionalRepository.getProfessionalByIdIsCalled)
  })

  it("Verifies if get professional by user id is called", async () => {
    const getProfessionalUC = makeUseCase(true)
    const params = makeParams({ userId: "USER_ID" })

    const _ = await submitUCRequest({
      uc: getProfessionalUC,
      params: params
    })

    assertTrue(getProfessionalUC.professionalRepository.getProfessionalByUserIdIsCalled)
  })

  it("Verifies if throws a missing parameter error", async () => {
    const getProfessionalUC = makeUseCase(true)
    const params = makeParams({})
    let error = null

    const _ = await submitUCRequest({
      uc: getProfessionalUC,
      params: params,
      errorCallback: (e) => error = e
    })

    assertErrorType(error, MissingRequiredParameterError)
  })

  it("Verifies if throws a professional not found error", async () => {
    const getProfessionalUC = makeUseCase(false)
    const params = makeParams({ userId: "USER_ID" })
    let error = null

    const _ = await submitUCRequest({
      uc: getProfessionalUC,
      params: params,
      errorCallback: (e) => error = e
    })

    assertErrorType(error, ProfessionalNotFoundError)
  })
})

const makeUseCase = returnProfessional => new GetProfessionalUC({
  professionalRepository: new ProfessionalRepositorySpy(returnProfessional)
})

const makeParams = ({ id, userId }) => new GetProfessionalUCParams({ id, userId })