const express = require('express')
const router = express.Router()

const { buildUpsertCustomerUC, buildGetCustomerUC } = require('../../dependency_injection')
const SecurityPreHandler = require('../common/security_pre_handler')
const CustomerController = require('./customer_controller')
const generateError = require('../common/generate_error')

const customerController = new CustomerController({
  upsertCustomerUC: buildUpsertCustomerUC(),
  getCustomerUC: buildGetCustomerUC()
})

router.post(
  '/profile',
  SecurityPreHandler.checkUserIsAuthenticated,
  SecurityPreHandler.checkUserIsAuthorized(['Customer']),
  async (req, res) => {
    try {
      const customer = await customerController.upsertCustomer(req)
      res.send({ customer })
    }
    catch (e) {
      generateError(res, e)
    }
  }
)

router.get(
  '/profile',
  SecurityPreHandler.checkUserIsAuthenticated,
  SecurityPreHandler.checkUserIsAuthorized(['Customer']),
  async (req, res) => {
    try {
      const customer = await customerController.getCustomer(req)
      res.send({ customer })
    }
    catch (e) {
      generateError(res, e)
    }
  }
)

router.get(
  '/profile/:id',
  SecurityPreHandler.checkUserIsAuthenticated,
  SecurityPreHandler.checkUserIsAuthorized(['Professional']),
  async (req, res) => {
    try {
      const customer = await customerController.getCustomerById(req)
      res.send({ customer })
    }
    catch (e) {
      generateError(res, e)
    }
  }
)

module.exports = app => app.use('/customers', router)