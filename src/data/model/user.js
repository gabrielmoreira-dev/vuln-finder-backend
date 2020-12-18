const mongoose = require('../infrastructure/mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  role: {
    type: String,
    required: true,
    enum: ['Cliente', 'Profissional']
  }
})

const User = mongoose.model('User', UserSchema)

module.exports = User