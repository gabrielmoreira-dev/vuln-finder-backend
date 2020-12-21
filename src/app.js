const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

require('./route/auth_routes')(app)
require('./route/client_routes')(app)

module.exports = app