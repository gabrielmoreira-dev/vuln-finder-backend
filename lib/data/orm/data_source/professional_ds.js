const ProfessionalDBM = require('../model/professional')

module.exports = class {
  upsertProfessional = (userId, professionalEntity) => ProfessionalDBM
    .findOneAndUpdate(
      { user: userId },
      { ...professionalEntity },
      { new: true, upsert: true }
    )

  getProfessionalById = id => ProfessionalDBM
    .findById(id)
    .populate('user')

  getProfessionalByUserId = userId => ProfessionalDBM
    .findOne({ user: userId })
    .populate('user')

  getProfessionalList = _ => ProfessionalDBM
    .find()

  getProfessionalListByCity = city => ProfessionalDBM
    .find({
      'address.city': city
    })
}