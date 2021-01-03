const mongoose = require('../infrastructure/mongoose')
const CustomerSchema = require('./schema/customer_schema')

module.exports = mongoose.model('Customer', CustomerSchema)