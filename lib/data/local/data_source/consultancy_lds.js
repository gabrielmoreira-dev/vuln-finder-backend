const ConsultancyLM = require('../model/consultancy_lm')

module.exports = class {
  insertConsultancy = (customerId, professionalId, reportId) => ConsultancyLM
    .create({
      customer: customerId,
      professional: professionalId,
      report: reportId
    })
}