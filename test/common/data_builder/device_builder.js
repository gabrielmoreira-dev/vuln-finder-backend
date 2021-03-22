/* istanbul ignore file */

module.exports = class {
  description = null
  services = null

  static withDescription = description => {
    this.description = description
    return this
  }

  static withServices = services => {
    this.services = services
    return this
  }

  static build = _ => {
    const device = {
      description: this.description,
      services: this.services,
    }

    this.description = null
    this.services = null

    return device
  }
}