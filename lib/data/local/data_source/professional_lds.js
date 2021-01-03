const ProfessionalLM = require('../model/professional_lm')

module.exports = class {
  upsertProfessional = (userId, professional) => ProfessionalLM
    .findOneAndUpdate(
      { user: userId },
      { ...professional },
      { new: true, upsert: true }
    )

  getProfessionalById = id => ProfessionalLM
    .findById(id)
    .populate('user')

  getProfessionalByUserId = userId => ProfessionalLM
    .findOne({ user: userId })
    .populate('user')

  getProfessionalList = _ => ProfessionalLM
    .find()

  getProfessionalListByCity = city => ProfessionalLM
    .find({
      'address.city': city
    })
}