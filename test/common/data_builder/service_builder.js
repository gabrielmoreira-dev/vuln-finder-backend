/* istanbul ignore file */

module.exports = class {
  port = null
  vendor = null
  product = null
  version = null

  static withPort = port => {
    this.port = port
    return this
  }

  static withVendor = vendor => {
    this.vendor = vendor
    return this
  }

  static withProduct = product => {
    this.product = product
    return this
  }

  static withVersion = version => {
    this.version = version
    return this
  }

  static build = _ => {
    const service = {
      port: this.port,
      vendor: this.vendor,
      product: this.product,
      version: this.version
    }

    this.port = null
    this.vendor = null
    this.product = null
    this.version = null

    return service
  }
}