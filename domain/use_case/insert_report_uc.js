const InsertReportUC = class {
  constructor({ reportRepository }) {
    this.reportRepository = reportRepository
  }

  getFuture = async params => this.reportRepository
    .insertReport(params.userId, params.devices)
}

const InsertReportUCParams = class {
  constructor({ userId, devices }) {
    this.userId = userId
    this.devices = devices
  }
}

module.exports = { InsertReportUC, InsertReportUCParams }