const UpsertProfessionalUC = class {
  constructor({ professionalRepository }) {
    this.professionalRepository = professionalRepository
  }

  getFuture = async params => this.professionalRepository
    .upsertProfessional(params.userId, params.professional)
}

const UpsertProfessionalUCParams = class {
  constructor(userId, professional) {
    this.userId = userId
    this.professional = professional
  }
}

module.exports = { UpsertProfessionalUC, UpsertProfessionalUCParams }