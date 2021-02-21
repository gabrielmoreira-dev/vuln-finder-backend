module.exports = class {
  name = null
  email = null
  password = null
  role = null

  static withName = name => {
    this.name = name
    return this
  }

  static withEmail = email => {
    this.email = email
    return this
  }

  static withPassword = password => {
    this.password = password
    return this
  }

  static withRole = role => {
    this.role = role
    return this
  }

  static build = _ => {
    return {
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role
    }
  }
}