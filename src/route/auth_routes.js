const express = require('express')
const router = express.Router()
const AuthController = require('../controller/auth_controller')

router.post('/', async (req, res) => {
  await AuthController.registerUser(req, res)
})

module.exports = router