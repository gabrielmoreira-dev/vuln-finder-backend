const ProfessionalRM = require('../model/professional')

module.exports = class {
  upsertProfessional(userId, professionalEntity) {
    return ProfessionalRM.findOneAndUpdate(
      { user: userId },
      { ...professionalEntity },
      { new: true, upsert: true }
    )
  }

  getProfessionalById(id) {
    return ProfessionalRM.findById(id).populate('user')
  }

  getProfessionalByUserId(userId) {
    return ProfessionalRM.findOne({ user: userId }).populate('user')
  }

  getProfessionalList() {
    return ProfessionalRM.find()
  }

  getProfessionalListByCity(city) {
    return ProfessionalRM.find({
      'address.city': city
    })
  }
}