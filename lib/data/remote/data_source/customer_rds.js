const CustomerRM = require('../model/customer_rm')

module.exports = class {
  upsertCustomer = (userId, customerEntity) => CustomerRM
    .findOneAndUpdate(
      { user: userId },
      { ...customerEntity },
      { new: true, upsert: true }
    )

  getCustomerById = id => CustomerRM
    .findById(id)
    .populate('user')

  getCustomerByUserId = userId => CustomerRM
    .findOne({ user: userId })
    .populate('user')

}