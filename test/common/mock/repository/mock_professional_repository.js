const ProfessionalDataRepository = require("../../../../domain/data_repository/professional_data_repository")

module.exports = class extends ProfessionalDataRepository {
  isUpsertProfessionalCalled = false
  isGetProfessionalByIdCalled = false
  isGetProfessionalByUserIdCalled = false
  isGetProfessionalListCalled = false
  isGetProfessionalListByCityCalled = false

  upsertProfessional = (_, __) => {
    this.isUpsertProfessionalCalled = true
  }

  getProfessionalById = _ => {
    this.isGetProfessionalByIdCalled = true
  }

  getProfessionalByUserId = _ => {
    this.isGetProfessionalByUserIdCalled = true
  }

  getProfessionalList = () => {
    this.isGetProfessionalListCalled = true
  }

  getProfessionalListByCity = () => {
    this.isGetProfessionalListByCityCalled = true
  }
}