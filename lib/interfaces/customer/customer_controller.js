const errors = require('../../common/errors')
const generateError = require('../../common/generate_error')
const Customer = require('../../data/local/model/customer_lm')

module.exports = {

  upsertCustomer: async (req, res) => {
    const user = req.user.id

    try {
      const customer = await Customer.findOneAndUpdate(
        { user },
        { ...req.body },
        { new: true, upsert: true }
      )

      return res.send(customer)
    }
    catch (e) {
      return generateError(res, 500, e.message)
    }
  },

  getCustomer: async (req, res) => {
    const user = req.user.id

    try {
      const customer = await Customer.findOne({ user }).populate('user')

      if (!customer) {
        return generateError(res, 400, errors.customerNotFound)
      }

      return res.send(customer)
    }
    catch (e) {
      return generateError(res, 500, e.message)
    }
  },

  getCustomerById: async (req, res) => {
    const customerId = req.params.id

    try {
      const customer = await Customer.findById(customerId).populate('user')

      if (!customer) {
        return generateError(res, 400, errors.customerNotFound)
      }

      return res.send(customer)
    }
    catch (e) {
      return generateError(res, 500, e.message)
    }
  }

}