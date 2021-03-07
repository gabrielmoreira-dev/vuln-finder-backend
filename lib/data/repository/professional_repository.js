const ProfessionalDataRepository = require('../../../domain/data_repository/professional_data_repository')
const toDM = require('../mapper/professional_local_to_domain')

module.exports = class extends ProfessionalDataRepository {
  constructor({ professionalLDS }) {
    super()
    this.professionalLDS = professionalLDS
  }

  upsertProfessional = (userId, professional) => this.professionalLDS
    .upsertProfessional(userId, professional)
    .then(toDM)

  getProfessionalById = id => this.professionalLDS
    .getProfessionalById(id)
    .then(toDM)

  getProfessionalByUserId = userId => this.professionalLDS
    .getProfessionalByUserId(userId)
    .then(toDM)

  getProfessionalList = _ => this.professionalLDS
    .getProfessionalList()
    .then(toDM)

  getProfessionalListByCity = city => this.professionalLDS
    .getProfessionalListByCity(city)
    .then(toDM)
}