const ReportDataRepository = require('../../../domain/data_repository/report_data_repository')
const toLM = require('../mapper/vulnerability_remote_to_local')
const toDM = require('../mapper/report_local_to_domain')

module.exports = class extends ReportDataRepository {
  constructor({ reportLDS, vulnerabilityRDS }) {
    super()
    this.reportLDS = reportLDS
    this.vulnerabilityRDS = vulnerabilityRDS
  }

  insertReport = async (userId, devices) => {
    let report = { user: userId, devices: [] }

    for (let device of devices) {
      const { description, services } = device
      let reportDevice = { description, services: [] }

      for (let service of services) {
        const { data } = await this.vulnerabilityRDS
          .getVulnerability(service)
        const vulnerabilities = toLM(data)

        const { port, vendor, product, version } = service
        reportDevice.services
          .push({ port, vendor, product, version, vulnerabilities })
      }

      report.devices
        .push(reportDevice)
    }

    return this.reportLDS
      .insertReport(report)
      .then(toDM)
  }
}