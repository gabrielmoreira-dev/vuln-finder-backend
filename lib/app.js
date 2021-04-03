const express = require('express')
const cors = require('cors')
const logger = require('../domain/logger')
const httpLogger = require('pino-http')({ logger })

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(httpLogger)

require('./interface/auth/auth_route')(app)
require('./interface/customer/customer_route')(app)
require('./interface/professional/professional_route')(app)
require('./interface/report/report_route')(app)
require('./interface/consultancy/consultancy_route')(app)

module.exports = app