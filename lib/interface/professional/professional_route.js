const express = require('express')
const router = express.Router()

const { buildUpsertProfessionalUC, buildGetProfessionalUC, buildGetProfessionalListUC } = require('../../dependency_injection')
const SecurityPreHandler = require('../common/security_pre_handler')
const ProfessionalController = require('./professional_controller')
const generateError = require('../common/generate_error')

const professionalController = new ProfessionalController({
  upsertProfessionalUC: buildUpsertProfessionalUC(),
  getProfessionalUC: buildGetProfessionalUC(),
  getProfessionalListUC: buildGetProfessionalListUC()
})

router.get(
  '/',
  SecurityPreHandler.checkUserIsAuthenticated,
  SecurityPreHandler.checkUserIsAuthorized(['Customer', 'Professional']),
  async (req, res) => {
    try {
      const professionalList = await professionalController.getProfessionalList(req)
      res.send({ professionalList })
    }
    catch (e) {
      generateError(res, e)
    }
  }
)

router.get(
  '/profile/:id',
  SecurityPreHandler.checkUserIsAuthenticated,
  SecurityPreHandler.checkUserIsAuthorized(['Customer', 'Professional']),
  async (req, res) => {
    try {
      const professional = await professionalController.getProfessionalById(req)
      res.send({ professional })
    }
    catch (e) {
      generateError(res, e)
    }
  }
)

router.post(
  '/profile',
  SecurityPreHandler.checkUserIsAuthenticated,
  SecurityPreHandler.checkUserIsAuthorized(['Professional']),
  async (req, res) => {
    try {
      const professional = await professionalController.upsertProfessional(req)
      res.send({ professional })
    }
    catch (e) {
      generateError(res, e)
    }
  }
)

router.get(
  '/profile',
  SecurityPreHandler.checkUserIsAuthenticated,
  SecurityPreHandler.checkUserIsAuthorized(['Professional']),
  async (req, res) => {
    try {
      const professional = await professionalController.getProfessional(req)
      res.send({ professional })
    }
    catch (e) {
      generateError(res, e)
    }
  }
)

module.exports = app => app.use('/professionals', router)