const mongoose = require('../infrastructure/mongoose')

const Address = require('./address')

const ClientSchema = new mongoose.Schema({
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

const Client = mongoose.model('Client', ClientSchema)

module.exports = Client