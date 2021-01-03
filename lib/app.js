const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

require('./interfaces/auth/auth_route')(app)
require('./interfaces/customer/customer_route')(app)
require('./interfaces/professional/professional_route')(app)

module.exports = app