const Professional = require('../../../domain/model/professional')

const toDM = professionalLM => {
  console.log(professionalLM)

  return new Professional({
    id: professionalLM._id,
    user: {
      name: professionalLM.user.name,
      email: professionalLM.user.email
    },
    summary: professionalLM.summary,
    price: professionalLM.price,
    address: {
      cep: professionalLM.address.cep,
      street: professionalLM.address.street,
      number: professionalLM.address.number,
      complement: professionalLM.address.complement || null,
      district: professionalLM.address.district,
      city: professionalLM.address.city,
      state: professionalLM.address.state
    },
    phone: professionalLM.phone
  })
}

const listToDM = professionalListLM => professionalListLM.map(toDM)

module.exports = { toDM, listToDM }