const Report = require('../../../domain/model/report')
const Device = require('../../../domain/model/device')
const Service = require('../../../domain/model/service')
const Vulnerability = require('../../../domain/model/vulnerability')

const toDM = reportLM => new Report({
  id: reportLM._id,
  user: {
    name: reportLM.user.name,
    email: reportLM.user.email
  },
  date: reportLM.date,
  devices: reportLM.devices
    .map(device => new Device({
      description: device.description,
      services: device.services
        .map(service => new Service({
          port: service.port,
          vendor: service.vendor,
          product: service.product,
          version: service.version,
          vulnerabilities: service.vulnerabilities
            .map(vulnerability => new Vulnerability({
              summary: vulnerability.summary,
              impact: vulnerability.impact,
              countermeasure: vulnerability.countermeasure
            }))
        }))
    }))
})

module.exports = data => {
  if (!data) {
    return null
  }
  if (Array.isArray(data)) {
    return data.map(toDM)
  }
  return toDM(data)
}