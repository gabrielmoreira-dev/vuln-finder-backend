module.exports = class {
  constructor({ port, vendor = null, product, version, vulnerabilities }) {
    this.port = port
    this.vendor = vendor
    this.product = product
    this.version = version
    this.vulnerabilities = vulnerabilities
  }
}