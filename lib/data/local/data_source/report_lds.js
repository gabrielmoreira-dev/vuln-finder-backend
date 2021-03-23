const ReportLM = require('../model/report_lm')

module.exports = class {
  insertReport = report => ReportLM
    .create(report)
}