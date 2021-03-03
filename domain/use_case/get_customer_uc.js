const { MissingRequiredParameterError, CustomerNotFoundError } = require('../errors')

const GetCustomerUC = class {
  constructor({ customerRepository }) {
    this.customerRepository = customerRepository
  }

  getFuture = async params => {
    let customer
    if (params.id) {
      customer = this.customerRepository.getCustomerById(params.id)
    }
    else if (params.userId) {
      customer = this.customerRepository.getCustomerByUserId(params.userId)
    }
    else {
      throw new MissingRequiredParameterError()
    }

    if (!customer) {
      throw new CustomerNotFoundError()
    }

    return customer
  }
}

const GetCustomerUCParams = class {
  constructor({ id, userId }) {
    this.id = id
    this.userId = userId
  }
}

module.exports = { GetCustomerUC, GetCustomerUCParams }