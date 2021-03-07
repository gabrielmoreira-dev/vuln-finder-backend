module.exports = class {
  constructor({ id = null, user, summary, price, address, phone = null }) {
    this.id = id
    this.user = user
    this.summary = summary
    this.price = price
    this.address = address
    this.phone = phone
  }
}