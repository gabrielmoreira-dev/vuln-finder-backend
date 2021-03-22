const express = require('express')
const router = express.Router()

const { buildInsertReportUC } = require('../../dependency_injection')
const SecurityPreHandler = require('../common/security_pre_handler')
const ReportController = require('./report_controller')
const generateError = require('../common/generate_error')

const reportController = new ReportController({
  insertReportUC: buildInsertReportUC()
})

router.post(
  '/',
  SecurityPreHandler.checkUserIsAuthenticated,
  SecurityPreHandler.checkUserIsAuthorized(['Customer', 'Professional']),
  async (req, res) => {
    try {
      const report = await reportController.insertReport(req)
      res.send({ report })
    }
    catch (e) {
      generateError(res, e)
    }
  }
)

module.exports = app => app.use('/report', router)