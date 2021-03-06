const ProfessionalDataRepository = require("../../../../domain/data_repository/professional_data_repository")
const ProfessionalBuilder = require("../../data_builder/professional_builder")

module.exports = class extends ProfessionalDataRepository {
  upsertProfessionalIsCalled = false
  getProfessionalByIdIsCalled = false
  getProfessionalByUserIdIsCalled = false
  getProfessionalListIsCalled = false
  getProfessionalListByCityIsCalled = false

  returnProfessional = null
  professional = ProfessionalBuilder.build()

  constructor(returnProfessional = true) {
    super()
    this.returnProfessional = returnProfessional
  }

  upsertProfessional = (_, __) => {
    this.upsertProfessionalIsCalled = true
    return this.returnProfessional ? this.professional : null
  }

  getProfessionalById = _ => {
    this.getProfessionalByIdIsCalled = true
    return this.returnProfessional ? this.professional : null
  }

  getProfessionalByUserId = _ => {
    this.getProfessionalByUserIdIsCalled = true
    return this.returnProfessional ? this.professional : null
  }

  getProfessionalList = () => {
    this.getProfessionalListIsCalled = true
    return this.returnProfessional ? [this.professional] : null
  }

  getProfessionalListByCity = _ => {
    this.getProfessionalListByCityIsCalled = true
    return this.returnProfessional ? [this.professional] : null
  }
}