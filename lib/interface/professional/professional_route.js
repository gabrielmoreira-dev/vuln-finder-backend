const express = require('express')
const router = express.Router()
const SecurityPreHandler = require('../common/security_pre_handler')
const ProfessionalController = require('./professional_controller')

router.post(
  '/',
  SecurityPreHandler.checkUserIsAuthenticated,
  SecurityPreHandler.checkUserIsAuthorized(['Professional']),
  async (req, res) => {
    await ProfessionalController.upsertProfessional(req, res)
  }
)

router.get(
  '/',
  SecurityPreHandler.checkUserIsAuthenticated,
  SecurityPreHandler.checkUserIsAuthorized(['Customer']),
  async (req, res) => {
    await ProfessionalController.getProfessionalList(req, res)
  }
)

router.get(
  '/profile',
  SecurityPreHandler.checkUserIsAuthenticated,
  SecurityPreHandler.checkUserIsAuthorized(['Professional']),
  async (req, res) => {
    await ProfessionalController.getProfessional(req, res)
  }
)

router.get(
  '/:id',
  SecurityPreHandler.checkUserIsAuthenticated,
  SecurityPreHandler.checkUserIsAuthorized(['Customer']),
  async (req, res) => {
    await ProfessionalController.getProfessionalById(req, res)
  }
)

module.exports = app => app.use('/professionals', router)