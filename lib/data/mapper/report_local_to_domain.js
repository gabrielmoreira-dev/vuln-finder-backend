const Report = require('../../../domain/model/report')
const Device = require('../../../domain/model/device')
const Service = require('../../../domain/model/service')
const Vulnerability = require('../../../domain/model/vulnerability')
const translate = require('../../../domain/translate')

const toDM = async reportLM => new Report({
  id: reportLM._id,
  user: {
    name: reportLM.user.name,
    email: reportLM.user.email
  },
  date: reportLM.date,
  devices: await Promise.all(reportLM.devices
    .map(async device => new Device({
      description: device.description,
      services: await Promise.all(device.services
        .map(async service => new Service({
          port: service.port,
          vendor: service.vendor,
          product: service.product,
          version: service.version,
          vulnerabilities: await Promise.all(service.vulnerabilities
            .map(async vulnerability => new Vulnerability({
              summary: await translate(vulnerability.summary),
              impact: await getImpact(vulnerability.impact),
              countermeasure: await translate(vulnerability.countermeasure),
              risk: vulnerability.risk
            })))
        })))
    })))
})

const getImpact = async text => {
  if (text.includes('integrity')) {
    return 'Integridade'
  }
  else if (text.includes('confidentiality')) {
    return 'Confidencialidade'
  }
  else if (text.includes('availability')) {
    return 'Disponibilidade'
  }
  else return await translate(text)
}

module.exports = data => {
  if (!data) {
    return null
  }
  if (Array.isArray(data)) {
    return data.map(toDM)
  }
  return toDM(data)
}