const mongoose = require('../infrastructure/mongoose')
const ReportSchema = require('./schema/report_schema')

module.exports = mongoose.model('Report', ReportSchema)