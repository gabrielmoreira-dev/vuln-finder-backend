const { InsertReportUCParams } = require('../../../domain/use_case/insert_report_uc')
const Controller = require('../common/controller')

module.exports = class extends Controller {
  constructor({ insertReportUC }) {
    super()
    this.insertReportUC = insertReportUC
  }

  insertReport = async req => {
    const userId = req.user.id
    const data = req.body
    const devices = data.devices

    this.validateEntryParameters([userId, devices])

    return this.insertReportUC
      .getFuture(new InsertReportUCParams({ userId, devices }))
  }
}