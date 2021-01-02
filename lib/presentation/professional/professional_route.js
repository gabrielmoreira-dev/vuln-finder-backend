const express = require('express')
const router = express.Router()
const authenticate = require('../../middleware/authenticate')
const authorize = require('../../middleware/authorize')
const ProfessionalController = require('./professional_controller')

router.post(
  '/',
  authenticate,
  authorize('Professional'),
  async (req, res) => {
    await ProfessionalController.upsertProfessional(req, res)
  }
)

router.get(
  '/',
  authenticate,
  authorize('Customer'),
  async (req, res) => {
    await ProfessionalController.getProfessionalList(req, res)
  }
)

router.get(
  '/profile',
  authenticate,
  authorize('Professional'),
  async (req, res) => {
    await ProfessionalController.getProfessional(req, res)
  }
)

router.get(
  '/:id',
  authenticate,
  authorize('Customer'),
  async (req, res) => {
    await ProfessionalController.getProfessionalById(req, res)
  }
)

module.exports = app => app.use('/professionals', router)