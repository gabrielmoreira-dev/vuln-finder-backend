const ProfessionalController = require('../../../../lib/interface/professional/professional_controller')
const { MissingRequiredParameterError } = require('../../../../domain/errors')
const { makeRequest, assertTrue, assertErrorType, professionalList } = require("../../../common/utils")
const UseCaseSpy = require("../../../common/mock/use_case_spy")
const ProfessionalBuilder = require("../../../common/data_builder/professional_builder")

const professionalController = new ProfessionalController({
  upsertProfessionalUC: new UseCaseSpy(),
  getProfessionalUC: new UseCaseSpy(),
  getProfessionalListUC: new UseCaseSpy()
})

describe("Upsert professional", () => {
  it("Verifies if upsert professional uc is called", async () => {
    const userId = "USER_ID"
    const professional = ProfessionalBuilder.build()

    const req = makeRequest({ userId, body: professional })
    await professionalController.upsertProfessional(req)

    assertTrue(professionalController.upsertProfessionalUC.useCaseIsCalled)
  })

  it("Verifies if throws a missing parameter error", async () => {
    const professional = ProfessionalBuilder.build()
    let error

    const req = makeRequest({ body: professional })
    try {
      await professionalController.upsertProfessional(req)
    }
    catch (e) {
      error = e
    }

    assertErrorType(error, MissingRequiredParameterError)
  })
})

describe("Get professional", () => {
  it("Verifies if get professional uc is called", async () => {
    const userId = "USER_ID"

    const req = makeRequest({ userId })
    await professionalController.getProfessional(req)

    assertTrue(professionalController.getProfessionalUC.useCaseIsCalled)
  })

  it("Verifies if throws a missing parameter error", async () => {
    let error

    const req = makeRequest({})
    try {
      await professionalController.getProfessional(req)
    }
    catch (e) {
      error = e
    }

    assertErrorType(error, MissingRequiredParameterError)
  })
})

describe("Get professional by id", () => {
  it("Verifies if get professional uc is called", async () => {
    const id = "USER_ID"

    const req = makeRequest({ id })
    await professionalController.getProfessionalById(req)

    assertTrue(professionalController.getProfessionalUC.useCaseIsCalled)
  })

  it("Verifies if throws a missing parameter error", async () => {
    let error

    const req = makeRequest({})
    try {
      await professionalController.getProfessionalById(req)
    }
    catch (e) {
      error = e
    }

    assertErrorType(error, MissingRequiredParameterError)
  })
})

describe("Get professional list", () => {
  it("Verifies if get professional list uc is called", async () => {
    const req = makeRequest({})
    await professionalController.getProfessionalList(req)

    assertTrue(professionalController.getProfessionalListUC.useCaseIsCalled)
  })

  it("Verifies if get professional list uc is called with city", async () => {
    const city = "CITY"

    const req = makeRequest({ city })
    await professionalController.getProfessionalList(req)

    assertTrue(professionalController.getProfessionalListUC.useCaseIsCalled)
  })
})