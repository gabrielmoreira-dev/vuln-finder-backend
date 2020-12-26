const errors = require('../common/errors')
const generateError = require('../common/generate_error')
const Client = require('../data/model/client')

module.exports = {

  upsertClient: async (req, res) => {
    const user = req.user.id

    try {
      const client = await Client.findOneAndUpdate(
        { user },
        { ...req.body },
        { new: true, upsert: true }
      )

      return res.send(client)
    }
    catch (e) {
      return generateError(res, 500, e.message)
    }
  },

  getClient: async (req, res) => {
    const user = req.user.id

    try {
      const client = await Client.findOne({ user }).populate('user')

      if (!client) {
        return generateError(res, 400, errors.clientNotFound)
      }

      return res.send(client)
    }
    catch (e) {
      return generateError(res, 500, e.message)
    }
  },

  getClientById: async (req, res) => {
    const clientId = req.params.id

    try {
      const client = await Client.findById(clientId).populate('user')

      if (!client) {
        return generateError(res, 400, errors.clientNotFound)
      }

      return res.send(client)
    }
    catch (e) {
      return generateError(res, 500, e.message)
    }
  }

}