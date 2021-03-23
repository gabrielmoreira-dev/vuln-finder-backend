const mongoose = require('../../infrastructure/mongoose')
const DeviceSchema = require('./device_schema')

module.exports = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  devices: {
    type: [DeviceSchema]
  }
})