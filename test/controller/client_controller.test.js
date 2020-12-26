const Client = require('../../src/data/model/client')
const ClientController = require('../../src/controller/client_controller')
const errors = require('../../src/common/errors')

jest.mock('../../src/data/model/client')

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

const clientData = {
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

let clientList

beforeEach(() => {
  clientList = [
    {
      id: 0,
      user: 0,
      ...clientData
    }
  ]
})

describe('Insert client', () => {

  beforeAll(() => {
    Client.findOneAndUpdate.mockImplementation((req, body) => {
      const index = clientList.findIndex(client => {
        return client.user == req.user
      })

      if (index === -1) {
        clientList.push({
          user: req.user,
          ...body
        })
      }
      else {
        Object.keys(body).forEach(key => {
          clientList[index][key] = body[key]
        })
      }

      return true
    })
  })

  it('Should register a client profile', async () => {
    const req = {
      user: { id: 1 },
      body: { ...clientData }
    }

    const result = await ClientController.upsertClient(req, res)

    expect(result['status']).toBeDefined()
    expect(result['status']).toEqual(200)
    expect(clientList.length).toBe(2)
    expect(clientList[1].user).toBe(1)
  })

  it('Should update a client profile', async () => {
    const req = {
      user: { id: 0 },
      body: {
        phone: '11888888888'
      }
    }

    const result = await ClientController.upsertClient(req, res)

    expect(result['status']).toBeDefined()
    expect(result['status']).toEqual(200)
    expect(clientList[0].phone).toBe('11888888888')
  })

})

describe('Get client', () => {

  beforeAll(() => {
    Client.findOne.mockImplementation(({ user }) => {
      return {
        populate: () => clientList.find(client => {
          return client.user === user
        })
      }
    })
  })

  it('Should return the client', async () => {
    const req = {
      user: { id: 0 }
    }

    const result = await ClientController.getClient(req, res)

    expect(result['status']).toBeDefined()
    expect(result['status']).toEqual(200)
  })

  it('Should return an unregistered client error', async () => {
    const req = {
      user: { id: 1 }
    }

    const result = await ClientController.getClient(req, res)

    expect(result['error']).toBeDefined()
    expect(result).toEqual({ 'error': errors.clientNotFound })
  })

})

describe('Get client by id', () => {

  beforeAll(() => {
    Client.findById.mockImplementation((id) => {
      return {
        populate: () => clientList.find(client => {
          return client.id === id
        })
      }
    })
  })

  it('Should return the client', async () => {
    const req = {
      params: { id: 0 }
    }

    const result = await ClientController.getClientById(req, res)

    expect(result['status']).toBeDefined()
    expect(result['status']).toEqual(200)
  })

  it('Should return an unregistered client error', async () => {
    const req = {
      params: { id: 1 }
    }

    const result = await ClientController.getClientById(req, res)

    expect(result['error']).toBeDefined()
    expect(result).toEqual({ 'error': errors.clientNotFound })
  })

})