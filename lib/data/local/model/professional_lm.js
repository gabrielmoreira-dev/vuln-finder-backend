const mongoose = require('../infrastructure/mongoose')
const ProfessionalSchema = require('./schema/professional_schema')

module.exports = mongoose.model('Professional', ProfessionalSchema)