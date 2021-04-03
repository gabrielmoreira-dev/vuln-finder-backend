const mongoose = require('../infrastructure/mongoose')
const ConsultancySchema = require('./schema/consultancy_schema')

module.exports = mongoose.model('Consultancy', ConsultancySchema)