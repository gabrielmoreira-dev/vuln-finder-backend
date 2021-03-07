const CustomerDataRepository = require('../../../domain/data_repository/customer_data_repository')
const toDM = require('../mapper/customer_local_to_domain')

module.exports = class extends CustomerDataRepository {
  constructor({ customerLDS }) {
    super()
    this.customerLDS = customerLDS
  }

  upsertCustomer = (userId, customer) => this.customerLDS
    .upsertCustomer(userId, customer)
    .then(toDM)

  getCustomerById = id => this.customerLDS
    .getCustomerById(id)
    .then(toDM)

  getCustomerByUserId = userId => this.customerLDS
    .getCustomerByUserId(userId)
    .then(toDM)

}