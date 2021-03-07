const { UpsertCustomerUCParams } = require('../../../domain/use_case/upsert_customer_uc')
const { GetCustomerUCParams } = require('../../../domain/use_case/get_customer_uc')
const Controller = require('../common/controller')

module.exports = class extends Controller {
  constructor({
    upsertCustomerUC,
    getCustomerUC
  }) {
    super()
    this.upsertCustomerUC = upsertCustomerUC
    this.getCustomerUC = getCustomerUC
  }

  upsertCustomer = async req => {
    const userId = req.user.id
    const customer = req.body
    this.validateEntryParameters([userId, customer])
    return this.upsertCustomerUC
      .getFuture(new UpsertCustomerUCParams({ userId, customer }))
  }

  getCustomer = async req => {
    const userId = req.user.id
    this.validateEntryParameters([userId])
    return this.getCustomerUC
      .getFuture(new GetCustomerUCParams({ userId }))
  }

  getCustomerById = async req => {
    const id = req.params.id
    this.validateEntryParameters([id])
    return this.getCustomerUC
      .getFuture(new GetCustomerUCParams({ id }))
  }
}