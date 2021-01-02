const CustomerRM = require('../model/customer_rm')

module.exports = class {
  upsertCustomer(userId, customerEntity) {
    return CustomerRM.findOneAndUpdate(
      { user: userId },
      { ...customerEntity },
      { new: true, upsert: true }
    )
  }

  getCustomerById(id) {
    return CustomerRM.findById(id).populate('user')
  }

  getCustomerByUserId(userId) {
    return CustomerRM.findOne({ user: userId }).populate('user')
  }
}