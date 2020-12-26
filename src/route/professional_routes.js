const express = require('express')
const router = express.Router()
const authenticate = require('../middleware/authenticate')
const authorize = require('../middleware/authorize')
const ProfessionalController = require('../controller/professional_controller')

router.post(
  '/',
  authenticate,
  authorize('Professional'),
  async (req, res) => {
    await ProfessionalController.upsertProfessional(req, res)
  }
)

module.exports = app => app.use('/professional', router)