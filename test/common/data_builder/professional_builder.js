/* istanbul ignore file */

module.exports = class {
  summary = null
  price = null
  address = null
  phone = null

  static withSummary = summary => {
    this.summary = summary
    return this
  }

  static withPrice = price => {
    this.price = price
    return this
  }

  static withAddress = address => {
    this.address = address
    return this
  }

  static withPhone = phone => {
    this.phone = phone
    return this
  }

  static build = _ => {
    const professional = {
      summary: this.summary,
      price: this.price,
      address: this.address,
      phone: this.phone
    }

    this.summary = null
    this.price = null
    this.address = null
    this.phone = null

    return professional
  }
}