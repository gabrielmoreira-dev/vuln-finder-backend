/* istanbul ignore file */

module.exports = class {
  address = null
  phone = null
  id = null

  static withAddress = address => {
    this.address = address
    return this
  }

  static withPhone = phone => {
    this.phone = phone
    return this
  }

  static withId = id => {
    this.id = id
    return this
  }

  static build = _ => {
    const customer = {
      address: this.address,
      phone: this.phone,
      id: this.id
    }

    this.address = null
    this.phone = null
    this.id = null

    return customer
  }
}