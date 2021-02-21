const { UpsertProfessionalUC, UpsertProfessionalUCParams } = require("../../../domain/use_case/upsert_professional_uc")
const { submitUCRequest, assertTrue } = require("../../test_utils")

describe.only("Upsert professional", () => {
  it("Verify if repository was called", async () => {
    const upsertProfessionalUC = makeUseCase()
    const params = makeParams({
      userId: 'REGISTERED_USER_ID',
      professional: {
        address: {},
        phone: '99999999',
        price: 100.0
      }
    })

    const _ = await submitUCRequest({
      uc: upsertProfessionalUC,
      params: params,
      errorCallback: (e) => {
        console.log(e)
      }
    })

    assertTrue(upsertProfessionalUC.professionalRepository.isUpsertProfessionalCalled)
  })
})

const makeUseCase = _ => {
  const MockProfessionalRepository = class {
    isUpsertProfessionalCalled = false
    upsertProfessional = (_, __) => {
      this.isUpsertProfessionalCalled = true
    }
  }
  return new UpsertProfessionalUC({
    professionalRepository: new MockProfessionalRepository()
  })
}

const makeParams = ({ userId, professional }) => new UpsertProfessionalUCParams(userId, professional)