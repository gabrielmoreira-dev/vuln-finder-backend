const mongoose = require('../infrastructure/mongoose')
const UserSchema = require('./schema/user_schema')

module.exports = mongoose.model('User', UserSchema)