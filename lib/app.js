const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

require('./presentation/auth/auth_route')(app)
require('./presentation/customer/customer_route')(app)
require('./presentation/professional/professional_route')(app)

module.exports = app