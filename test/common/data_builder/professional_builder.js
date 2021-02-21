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
    return {
      summary: this.summary,
      price: this.price,
      address: this.address,
      phone: this.phone
    }
  }
}