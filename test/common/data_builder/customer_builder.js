module.exports = class {
  address = null
  phone = null

  static withAddress = address => {
    this.address = address
    return this
  }

  static withPhone = phone => {
    this.phone = phone
    return this
  }

  static build = _ => {
    return {
      address: this.address,
      phone: this.phone
    }
  }
}