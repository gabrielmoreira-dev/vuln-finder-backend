const mongoose = require('../infrastructure/mongoose')

const Address = require('./address')

const ProfessionalSchema = new mongoose.Schema({
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
  address: Address,
  phone: {
    type: String
  }
})

const Professional = mongoose.model('Professional', ProfessionalSchema)

module.exports = Professional