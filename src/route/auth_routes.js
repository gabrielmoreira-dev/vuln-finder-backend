const express = require('express')
const router = express.Router()
const AuthController = require('../controller/auth_controller')

router.post('/register', async (req, res) => {
  await AuthController.registerUser(req, res)
})

module.exports = router