const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
  useUnifiedTopology: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useCreateIndex: true
})

const db = mongoose.connection

db.once('open', () => {
  console.log('Mongoose default connection is open')
})

db.on('error', err => {
  console.log(`Mongoose default connection has occured \n${err}`)
})

db.on('disconnected', () => {
  console.log('Mongoose default connection is disconnected')
})

process.on('SIGINT', () => {
  db.close(() => {
    console.log(
      'Mongoose default connection is disconnected due to application termination'
    );
    process.exit(0)
  })
})

module.exports = mongoose