const mongoose = require('../infrastructure/mongoose')

const Address = require('./address')

const CustomerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  address: Address,
  phone: {
    type: String
  }
})

const Customer = mongoose.model('Customer', CustomerSchema)

module.exports = Customer