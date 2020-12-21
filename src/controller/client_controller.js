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
  }

}