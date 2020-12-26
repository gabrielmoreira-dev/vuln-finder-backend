const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

require('./route/auth_routes')(app)
require('./route/customer_routes')(app)
require('./route/professional_routes')(app)

module.exports = app