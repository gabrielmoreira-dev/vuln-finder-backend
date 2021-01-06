const express = require('express')
const router = express.Router()

const {
  buildGetAccessTokenUC,
  buildInsertUserUC,
  buildValidateEmailFormatUC,
  buildValidatePasswordFormatUC
} = require('../../dependency_injection')
const AuthController = require('./auth_controller')
const authController = new AuthController({
  getAccessTokenUC: buildGetAccessTokenUC(),
  insertUserUC: buildInsertUserUC(),
  validateEmailFormatUC: buildValidateEmailFormatUC(),
  validatePasswordFormatUC: buildValidatePasswordFormatUC()
})

router.post('/register', async (req, res) => {
  try {
    const accessToken = await authController.registerUser(req)
    res.send({ accessToken })
  }
  catch (e) {
    res.status(400).send({
      error: e.message
    })
  }
})

router.post('/authenticate', async (req, res) => {
  // await AuthController.authenticateUser(req, res)
})

module.exports = app => app.use('/auth', router)