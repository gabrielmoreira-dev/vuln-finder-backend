const express = require('express')
const router = express.Router()
const authenticate = require('../middleware/authenticate')
const authorize = require('../middleware/authorize')
const ClientController = require('../controller/client_controller')

router.post(
  '/',
  authenticate,
  authorize('Client'),
  async (req, res) => {
    await ClientController.upsertClient(req, res)
  }
)

router.get(
  '/',
  authenticate,
  authorize('Client'),
  async (req, res) => {
    await ClientController.getClient(req, res)
  }
)

module.exports = app => app.use('/client', router)