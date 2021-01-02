const mongoose = require('../infrastructure/mongoose')
const bcrypt = require('bcryptjs')
const UserSchema = require('./schema/user_schema')

UserSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10)
  this.password = hash

  next()
})

module.exports = mongoose.model('User', UserSchema)