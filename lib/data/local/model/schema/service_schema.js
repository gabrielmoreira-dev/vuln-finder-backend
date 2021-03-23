const mongoose = require('../../infrastructure/mongoose')
const VulnerabilitySchema = require('./vulnerability_schema')

module.exports = new mongoose.Schema({
  port: {
    type: String,
    required: true
  },
  vendor: {
    type: String
  },
  product: {
    type: String,
    required: true
  },
  version: {
    type: String,
    required: true
  },
  vulnerabilities: {
    type: [VulnerabilitySchema]
  }
})