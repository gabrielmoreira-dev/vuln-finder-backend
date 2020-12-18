const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// const indexRoutes = require('./routes/index-routes');
// app.use('/', indexRoutes);

module.exports = app