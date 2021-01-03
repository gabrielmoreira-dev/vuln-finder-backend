module.exports = class {
  constructor({ id = null, user, address, phone = null }) {
    this.id = id
    this.user = user
    this.address = address
    this.phone = phone
  }
}