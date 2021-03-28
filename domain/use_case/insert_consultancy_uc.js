const InsertConsultancyUC = class {
  constructor({ consultancyRepository }) {
    this.consultancyRepository = consultancyRepository
  }

  getFuture = async params => this.consultancyRepository
    .insertConsultancy(params.customerId, params.professionalId, params.reportId, params.createDate)
}

const InsertConsultancyUCParams = class {
  constructor({ customerId, professionalId, reportId, createDate }) {
    this.customerId = customerId
    this.professionalId = professionalId
    this.reportId = reportId
    this.createDate = createDate
  }
}

module.exports = { InsertConsultancyUC, InsertConsultancyUCParams }