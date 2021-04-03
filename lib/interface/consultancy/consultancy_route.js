const express = require('express')
const router = express.Router()

const { buildGetCustomerUC } = require('../../dependency_injection')
const { buildInsertConsultancyUC } = require('../../dependency_injection')
const SecurityPreHandler = require('../common/security_pre_handler')
const ConsultancyController = require('./consultancy_controller')
const generateError = require('../common/generate_error')

const consultancyController = new ConsultancyController({
  getCustomerUC: buildGetCustomerUC(),
  insertConsultancyUC: buildInsertConsultancyUC()
})

router.post(
  '/',
  SecurityPreHandler.checkUserIsAuthenticated,
  SecurityPreHandler.checkUserIsAuthorized(['Customer']),
  async (req, res) => {
    try {
      const consultancy = await consultancyController.insertConsultancy(req)
      res.send({ consultancy })
    }
    catch (e) {
      generateError(res, e)
    }
  }
)

module.exports = app => app.use('/consultancy', router)