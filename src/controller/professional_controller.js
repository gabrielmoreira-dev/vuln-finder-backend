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
  },

  getProfessional: async (req, res) => {
    const user = req.user.id

    try {
      const professional = await Professional.findOne({ user }).populate('user')

      if (!professional) {
        return generateError(res, 400, errors.professionalNotFound)
      }

      return res.send(professional)
    }
    catch (e) {
      return generateError(res, 500, e.message)
    }
  },

  getProfessionalById: async (req, res) => {
    const professionalId = req.params.id

    try {
      console.log(professionalId)

      const professional = await Professional.findById(professionalId).populate('user')

      if (!professional) {
        return generateError(res, 400, errors.professionalNotFound)
      }

      return res.send(professional)
    }
    catch (e) {
      return generateError(res, 500, e.message)
    }
  }

}