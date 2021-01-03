const CustomerDataRepository = require('../../../domain/data_repository/customer_data_repository')
const mapToDM = require('../mapper/customer_local_to_domain')

module.exports = class extends CustomerDataRepository {

  constructor(customerLDS) {
    super()
    this.customerLDS = customerLDS
  }

  upsertCustomer = (userId, customer) => this.customerLDS
    .upsertCustomer(userId, customer)
    .then(mapToDM)

  getCustomerById = id => this.customerLDS
    .getCustomerById(id)
    .then(mapToDM)

  getCustomerByUserId = userId => this.customerLDS
    .getCustomerByUserId(userId)
    .then(mapToDM)
}