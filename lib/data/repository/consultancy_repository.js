const ConsultancyDataRepository = require('../../../domain/data_repository/consultancy_data_repository')

module.exports = class extends ConsultancyDataRepository {
  consutructor({ consultancyLDS }) {
    super()
    this.consultancyLDS = consultancyLDS
  }

  insertConsultancy = (customerId, professionalId, reportId, createDate) => this.consultancyLDS
    .insertConsultancy({ customerId, professionalId, reportId, createDate })
}