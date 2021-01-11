const express = require('express')
const router = express.Router()

const { buildGetAccessTokenUC, buildInsertUserUC, buildValidateEmailFormatUC, buildValidatePasswordFormatUC, buildValidateUserPasswordUC, buildValidateUserPermissionUC } = require('../../dependency_injection')
const AuthController = require('./auth_controller')
const generateError = require('../common/generate_error')

const authController = new AuthController({
  getAccessTokenUC: buildGetAccessTokenUC(),
  insertUserUC: buildInsertUserUC(),
  validateEmailFormatUC: buildValidateEmailFormatUC(),
  validatePasswordFormatUC: buildValidatePasswordFormatUC(),
  validateUserPasswordUC: buildValidateUserPasswordUC(),
  validateUserPermissionUC: buildValidateUserPermissionUC()
})

router.post('/register', async (req, res) => {
  try {
    const accessToken = await authController.registerUser(req)
    res.send({ accessToken })
  }
  catch (e) {
    generateError(res, e)
  }
})

router.post('/authenticate', async (req, res) => {
  try {
    const accessToken = await authController.authenticateUser(req)
    res.send({ accessToken })
  }
  catch (e) {
    generateError(res, e)
  }
})

module.exports = app => app.use('/auth', router)