const mongoose = require('../../infrastructure/mongoose')
const AddressSchema = require('./address_schema')

module.exports = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  summary: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  address: {
    type: AddressSchema,
    required: true
  },
  phone: {
    type: String,
    required: true
  }
})