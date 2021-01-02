const Customer = require('../model/customer')

module.exports = class {
  upsertCustomer(userId, customerEntity) {
    return Customer.findOneAndUpdate(
      { user: userId },
      { ...customerEntity },
      { new: true, upsert: true }
    )
  }

  getCustomerById(id) {
    return Customer.findById(id).populate('user')
  }

  getCustomerByUserId(userId) {
    return Customer.findOne({ user: userId }).populate('user')
  }
}