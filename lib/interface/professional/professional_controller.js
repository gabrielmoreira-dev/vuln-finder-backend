const { UpsertProfessionalUCParams } = require('../../../domain/use_case/upsert_professional_uc')
const { GetProfessionalUCParams } = require('../../../domain/use_case/get_professional_uc')
const { GetProfessionalListUCParams } = require('../../../domain/use_case/get_professional_list_uc')
const Controller = require('../common/controller')

module.exports = class extends Controller {
  constructor({
    upsertProfessionalUC,
    getProfessionalUC,
    getProfessionalListUC
  }) {
    super()
    this.upsertProfessionalUC = upsertProfessionalUC
    this.getProfessionalUC = getProfessionalUC
    this.getProfessionalListUC = getProfessionalListUC
  }

  upsertProfessional = async req => {
    const userId = req.user.id
    const professional = req.body
    this.validateEntryParameters([userId, professional])
    return this.upsertProfessionalUC
      .getFuture(new UpsertProfessionalUCParams({ userId, professional }))
  }

  getProfessional = async req => {
    const userId = req.user.id
    this.validateEntryParameters([userId])
    return this.getProfessionalUC
      .getFuture(new GetProfessionalUCParams({ userId }))
  }

  getProfessionalById = async req => {
    const id = req.params.id
    this.validateEntryParameters([id])
    return this.getProfessionalUC
      .getFuture(new GetProfessionalUCParams({ id }))
  }

  getProfessionalList = async req => {
    const city = req.params.city
    return this.getProfessionalListUC
      .getFuture(new GetProfessionalListUCParams({ city }))
  }
}