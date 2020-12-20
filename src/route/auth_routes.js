const express = require('express')
const router = express.Router()
const AuthController = require('../controller/auth_controller')

router.post('/register', async (req, res) => {
  await AuthController.registerUser(req, res)
})

router.post('/authenticate', async (req, res) => {
  await AuthController.authenticateUser(req, res)
})

module.exports = app => app.use('/auth', router)