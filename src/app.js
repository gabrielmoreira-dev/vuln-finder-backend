const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const authRoutes = require('./route/auth_routes');
app.use('/auth', authRoutes);

module.exports = app