const Professional = require('../../../domain/model/professional')

const toDM = professionalLM => new Professional({
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

module.exports = data => {
  if (!data) {
    return null
  }
  if (Array.isArray(data)) {
    return data.map(toDM)
  }
  return toDM(data)
}