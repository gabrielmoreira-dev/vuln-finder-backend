const Customer = require('../../../domain/model/customer')

const toDM = customerLM => new Customer({
  id: customerLM._id,
  user: {
    name: customerLM.user.name,
    email: customerLM.user.email
  },
  address: {
    cep: customerLM.address.cep,
    street: customerLM.address.street,
    number: customerLM.address.number,
    complement: customerLM.address.complement || null,
    district: customerLM.address.district,
    city: customerLM.address.city,
    state: customerLM.address.state
  },
  phone: customerLM.phone
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