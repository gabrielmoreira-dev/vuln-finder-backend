const Professional = require('../../src/data/model/professional')
const ProfessionalController = require('../../src/controller/professional_controller')
const errors = require('../../src/common/errors')

jest.mock('../../src/data/model/professional')

const res = {
  send: (obj) => {
    return {
      status: 200,
      body: obj
    }
  },
  status: (_) => {
    return {
      send: (obj) => obj
    }
  }
}

const professionalData = {
  summary: 'summary',
  price: 100.00,
  address: {
    cep: '37500000',
    street: 'BPS',
    number: 1,
    district: 'Cruzeiro',
    city: 'Itajuba',
    state: 'MG'
  },
  phone: '11999999999'
}

let professionalList

beforeEach(() => {
  professionalList = [
    {
      id: 0,
      user: 0,
      ...professionalData
    }
  ]
})

describe('Insert professional', () => {

  beforeAll(() => {
    Professional.findOneAndUpdate.mockImplementation((req, body) => {
      const index = professionalList.findIndex(professional => {
        return professional.user == req.user
      })

      if (index === -1) {
        professionalList.push({
          user: req.user,
          ...body
        })
      }
      else {
        Object.keys(body).forEach(key => {
          professionalList[index][key] = body[key]
        })
      }

      return true
    })
  })

  it('Should register a professional profile', async () => {
    const req = {
      user: { id: 1 },
      body: { ...professionalData }
    }

    const result = await ProfessionalController.upsertProfessional(req, res)

    expect(result['status']).toBeDefined()
    expect(result['status']).toEqual(200)
    expect(professionalList.length).toBe(2)
    expect(professionalList[1].user).toBe(1)
  })

  it('Should update a professional profile', async () => {
    const req = {
      user: { id: 0 },
      body: {
        phone: '11888888888'
      }
    }

    const result = await ProfessionalController.upsertProfessional(req, res)

    expect(result['status']).toBeDefined()
    expect(result['status']).toEqual(200)
    expect(professionalList[0].phone).toBe('11888888888')
  })

})

describe('Get professional', () => {

  beforeAll(() => {
    Professional.findOne.mockImplementation(({ user }) => {
      return {
        populate: () => professionalList.find(professional => {
          return professional.user === user
        })
      }
    })
  })

  it('Should return the professional', async () => {
    const req = {
      user: { id: 0 }
    }

    const result = await ProfessionalController.getProfessional(req, res)

    expect(result['status']).toBeDefined()
    expect(result['status']).toEqual(200)
  })

  it('Should return an unregistered professional error', async () => {
    const req = {
      user: { id: 1 }
    }

    const result = await ProfessionalController.getProfessional(req, res)

    expect(result['error']).toBeDefined()
    expect(result).toEqual({ 'error': errors.professionalNotFound })
  })

})

describe('Get professional by id', () => {

  beforeAll(() => {
    Professional.findById.mockImplementation((id) => {
      return {
        populate: () => professionalList.find(professional => {
          return professional.id === id
        })
      }
    })
  })

  it('Should return the professional', async () => {
    const req = {
      params: { id: 0 }
    }

    const result = await ProfessionalController.getProfessionalById(req, res)

    expect(result['status']).toBeDefined()
    expect(result['status']).toEqual(200)
  })

  it('Should return an unregistered professional error', async () => {
    const req = {
      params: { id: 1 }
    }

    const result = await ProfessionalController.getProfessionalById(req, res)

    expect(result['error']).toBeDefined()
    expect(result).toEqual({ 'error': errors.professionalNotFound })
  })

})

