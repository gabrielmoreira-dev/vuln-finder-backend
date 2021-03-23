const mongoose = require('../../infrastructure/mongoose')
const ServiceSchema = require('./service_schema')

module.exports = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  services: {
    type: [ServiceSchema]
  }
})