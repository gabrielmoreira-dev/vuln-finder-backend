const CustomerDBM = require('../model/customer')

module.exports = class {
  upsertCustomer = (userId, customerEntity) => CustomerDBM
    .findOneAndUpdate(
      { user: userId },
      { ...customerEntity },
      { new: true, upsert: true }
    )

  getCustomerById = id => CustomerDBM
    .findById(id)
    .populate('user')

  getCustomerByUserId = userId => CustomerDBM
    .findOne({ user: userId })
    .populate('user')

}