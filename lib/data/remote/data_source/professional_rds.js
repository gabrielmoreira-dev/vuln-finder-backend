const ProfessionalRM = require('../model/professional_rm')

module.exports = class {
  upsertProfessional = (userId, professionalEntity) => ProfessionalRM
    .findOneAndUpdate(
      { user: userId },
      { ...professionalEntity },
      { new: true, upsert: true }
    )

  getProfessionalById = id => ProfessionalRM
    .findById(id)
    .populate('user')

  getProfessionalByUserId = userId => ProfessionalRM
    .findOne({ user: userId })
    .populate('user')

  getProfessionalList = _ => ProfessionalRM
    .find()

  getProfessionalListByCity = city => ProfessionalRM
    .find({
      'address.city': city
    })
}