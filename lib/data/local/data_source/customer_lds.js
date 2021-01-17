const CustomerLM = require('../model/customer_lm')

module.exports = class {
  upsertCustomer = (userId, customer) => CustomerLM
    .findOneAndUpdate(
      { user: userId },
      { ...customer },
      { new: true, upsert: true }
    )

  getCustomerById = id => CustomerLM
    .findById(id)
    .populate('user')

  getCustomerByUserId = userId => CustomerLM
    .findOne({ user: userId })
    .populate('user')
}