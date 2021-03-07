const { MissingRequiredParameterError, ProfessionalNotFoundError } = require("../errors")

const GetProfessionalUC = class {
  constructor({ professionalRepository }) {
    this.professionalRepository = professionalRepository
  }

  getFuture = async params => {
    let professional
    if (params.id) {
      professional = await this.professionalRepository.getProfessionalById(params.id)
    }
    else if (params.userId) {
      professional = await this.professionalRepository.getProfessionalByUserId(params.userId)
    }
    else {
      throw new MissingRequiredParameterError()
    }

    if (!professional) {
      throw new ProfessionalNotFoundError()
    }

    return professional
  }
}

const GetProfessionalUCParams = class {
  constructor({ id, userId }) {
    this.id = id
    this.userId = userId
  }
}

module.exports = { GetProfessionalUC, GetProfessionalUCParams }