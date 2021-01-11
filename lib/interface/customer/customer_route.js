const express = require('express')
const router = express.Router()
const SecurityPreHandler = require('../common/security_pre_handler')
const CustomerController = require('./customer_controller')

router.post(
  '/',
  SecurityPreHandler.checkUserIsAuthenticated,
  SecurityPreHandler.checkUserIsAuthorized(['Customer']),
  async (req, res) => {
    await CustomerController.upsertCustomer(req, res)
  }
)

router.get(
  '/profile',
  SecurityPreHandler.checkUserIsAuthenticated,
  SecurityPreHandler.checkUserIsAuthorized(['Customer']),
  async (req, res) => {
    await CustomerController.getCustomer(req, res)
  }
)

router.get(
  '/:id',
  SecurityPreHandler.checkUserIsAuthenticated,
  SecurityPreHandler.checkUserIsAuthorized(['Professional']),
  async (req, res) => {
    await CustomerController.getCustomerById(req, res)
  }
)

module.exports = app => app.use('/customers', router)