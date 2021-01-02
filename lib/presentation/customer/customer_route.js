const express = require('express')
const router = express.Router()
const authenticate = require('../../middleware/authenticate')
const authorize = require('../../middleware/authorize')
const CustomerController = require('./customer_controller')

router.post(
  '/',
  authenticate,
  authorize('Customer'),
  async (req, res) => {
    await CustomerController.upsertCustomer(req, res)
  }
)

router.get(
  '/profile',
  authenticate,
  authorize('Customer'),
  async (req, res) => {
    await CustomerController.getCustomer(req, res)
  }
)

router.get(
  '/:id',
  authenticate,
  authorize('Professional'),
  async (req, res) => {
    await CustomerController.getCustomerById(req, res)
  }
)

module.exports = app => app.use('/customers', router)