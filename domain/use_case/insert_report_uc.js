const InsertReportUC = class {
  constructor({ reportRepository }) {
    this.reportRepository = reportRepository
  }

  getFuture = async params => this.reportRepository
    .insertReport(params.userId, params.services)
}

const InsertReportUCParams = class {
  constructor({ userId, services }) {
    this.userId = userId
    this.services = services
  }
}

module.exports = { InsertReportUC, InsertReportUCParams }