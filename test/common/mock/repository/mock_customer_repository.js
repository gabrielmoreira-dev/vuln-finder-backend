const CustomerDataRepository = require("../../../../domain/data_repository/customer_data_repository")

module.exports = class extends CustomerDataRepository {
  isUpsertCustomerCalled = false
  isGetCustomerByIdCalled = false
  isGetCustomerByUserIdCalled = false

  upsertCustomer = (userId, customer) => {
    this.isUpsertCustomerCalled = true
  }

  getCustomerById = id => {
    this.isGetCustomerByIdCalled = true
  }

  getCustomerByUserId = userId => {
    this.isGetCustomerByUserIdCalled = true
  }
}