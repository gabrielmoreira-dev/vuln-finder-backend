const Professional = require('../model/professional')

module.exports = class {
  upsertProfessional(userId, professionalEntity) {
    return Professional.findOneAndUpdate(
      { user: userId },
      { ...professionalEntity },
      { new: true, upsert: true }
    )
  }

  getProfessionalById(id) {
    return Professional.findById(id).populate('user')
  }

  getProfessionalByUserId(userId) {
    return Professional.findOne({ user: userId }).populate('user')
  }

  getProfessionalList() {
    return Professional.find()
  }

  getProfessionalListByCity(city) {
    return Professional.find({
      'address.city': city
    })
  }
}