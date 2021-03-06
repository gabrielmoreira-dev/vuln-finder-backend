const GetProfessionalListUC = class {
  constructor({ professionalRepository }) {
    this.professionalRepository = professionalRepository
  }

  getFuture = async params => {
    if (params.city) {
      return this.professionalRepository.getProfessionalListByCity(params.city)
    }
    else {
      return this.professionalRepository.getProfessionalList()
    }
  }
}

const GetProfessionalListUCParams = class {
  constructor({ city }) {
    this.city = city
  }
}

module.exports = { GetProfessionalListUC, GetProfessionalListUCParams }