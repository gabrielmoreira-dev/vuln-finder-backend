const InsertConsultancyUC = class {
  constructor({ consultancyRepository }) {
    this.consultancyRepository = consultancyRepository
  }

  getFuture = async params => this.consultancyRepository
    .insertConsultancy(params.customerId, params.professionalId, params.reportId)
}

const InsertConsultancyUCParams = class {
  constructor({ customerId, professionalId, reportId }) {
    this.customerId = customerId
    this.professionalId = professionalId
    this.reportId = reportId
  }
}

module.exports = { InsertConsultancyUC, InsertConsultancyUCParams }