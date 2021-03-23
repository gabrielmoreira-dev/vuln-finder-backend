/* istanbul ignore file */

const ReportDataRepository = require('../../../../domain/data_repository/report_data_repository')

module.exports = class extends ReportDataRepository {
  insterReportIsCalled = false

  insertReport = _ => {
    this.insterReportIsCalled = true
  }
}