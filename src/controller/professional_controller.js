const errors = require('../common/errors')
const generateError = require('../common/generate_error')
const Professional = require('../data/model/professional')

module.exports = {

  upsertProfessional: async (req, res) => {
    const user = req.user.id

    try {
      const professional = await Professional.findOneAndUpdate(
        { user },
        { ...req.body },
        { new: true, upsert: true }
      )

      return res.send(professional)
    }
    catch (e) {
      return generateError(res, 500, e.message)
    }
  }

}