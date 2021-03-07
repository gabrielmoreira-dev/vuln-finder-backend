const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

require('./interface/auth/auth_route')(app)
require('./interface/customer/customer_route')(app)
require('./interface/professional/professional_route')(app)

module.exports = app