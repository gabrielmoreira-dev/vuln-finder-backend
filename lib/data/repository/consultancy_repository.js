const ConsultancyDataRepository = require('../../../domain/data_repository/consultancy_data_repository')

module.exports = class extends ConsultancyDataRepository {
  constructor({ consultancyLDS }) {
    super()
    this.consultancyLDS = consultancyLDS
  }

  insertConsultancy = (customerId, professionalId, reportId) => this.consultancyLDS
    .insertConsultancy(customerId, professionalId, reportId)
}