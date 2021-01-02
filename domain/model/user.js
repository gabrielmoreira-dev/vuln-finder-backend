module.exports = class {
  constructor({ id = null, name, email, password = null, role }) {
    this.id = id
    this.name = name
    this.email = email
    this.password = password
    this.role = role
  }
}