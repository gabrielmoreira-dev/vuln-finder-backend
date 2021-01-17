const { CustomerNotFoundError, MissingRequiredParameterError } = require('../errors')

const GetCustomerUC = class {
  constructor({ customerRepository }) {
    this.customerRepository = customerRepository
  }

  getFuture = async params => {
    if (!params.id && !params.userId) {
      throw new MissingRequiredParameterError()
    }
    let customer
    if (params.id) {
      customer = await this.customerRepository.getCustomerById(params.id)
    }
    else if (params.userId) {
      customer = await this.customerRepository.getCustomerByUserId(params.userId)
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