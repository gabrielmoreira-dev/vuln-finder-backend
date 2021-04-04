const { GetCustomerUCParams } = require('../../../domain/use_case/get_customer_uc')
const { InsertConsultancyUCParams } = require('../../../domain/use_case/insert_consultancy_uc')
const Controller = require('../common/controller')

module.exports = class extends Controller {
  constructor({ getCustomerUC, insertConsultancyUC }) {
    super()
    this.getCustomerUC = getCustomerUC
    this.insertConsultancyUC = insertConsultancyUC
  }

  insertConsultancy = async req => {
    const userId = req.user.id
    const data = req.body
    const professionalId = data.professionalId
    const reportId = data.reportId

    this.validateEntryParameters([userId, professionalId, reportId])

    const customer = await this.getCustomerUC
      .getFuture(new GetCustomerUCParams({ userId }))
    const customerId = customer.id

    return this.insertConsultancyUC
      .getFuture(new InsertConsultancyUCParams({ customerId, professionalId, reportId }))
  }
}