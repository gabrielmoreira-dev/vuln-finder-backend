const CustomerDataRepository = require("../../../../domain/data_repository/customer_data_repository")
const CustomerBuilder = require("../../data_builder/customer_builder")

module.exports = class extends CustomerDataRepository {
  upsertCustomerIsCalled = false
  getCustomerByIdIsCalled = false
  getCustomerByUserIdIsCalled = false

  returnCustomer = null
  customer = CustomerBuilder.build()

  constructor(returnCustomer = true) {
    super()
    this.returnCustomer = returnCustomer
  }

  upsertCustomer = (_, __) => {
    this.upsertCustomerIsCalled = true
    return this.returnCustomer ? this.customer : null
  }

  getCustomerById = _ => {
    this.getCustomerByIdIsCalled = true
    return this.returnCustomer ? this.customer : null
  }

  getCustomerByUserId = _ => {
    this.getCustomerByUserIdIsCalled = true
    return this.returnCustomer ? this.customer : null
  }
}