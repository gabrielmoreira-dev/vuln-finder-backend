const mongoose = require('../../infrastructure/mongoose')
const AddressSchema = require('./address_schema')

module.exports = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  address: AddressSchema,
  phone: {
    type: String
  }
})