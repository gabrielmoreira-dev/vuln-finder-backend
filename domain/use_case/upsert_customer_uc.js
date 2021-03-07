const UpsertCustomerUC = class {
  constructor({ customerRepository }) {
    this.customerRepository = customerRepository
  }

  getFuture = async params => this.customerRepository
    .upsertCustomer(params.userId, params.customer)
}

const UpsertCustomerUCParams = class {
  constructor({ userId, customer }) {
    this.userId = userId
    this.customer = customer
  }
}

module.exports = { UpsertCustomerUC, UpsertCustomerUCParams }