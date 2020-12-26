const Customer = require('../../src/data/model/customer')
const CustomerController = require('../../src/controller/customer_controller')
const errors = require('../../src/common/errors')

jest.mock('../../src/data/model/customer')

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

const customerData = {
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

let customerList

beforeEach(() => {
  customerList = [
    {
      id: 0,
      user: 0,
      ...customerData
    }
  ]
})

describe('Insert customer', () => {

  beforeAll(() => {
    Customer.findOneAndUpdate.mockImplementation((req, body) => {
      const index = customerList.findIndex(customer => {
        return customer.user == req.user
      })

      if (index === -1) {
        customerList.push({
          user: req.user,
          ...body
        })
      }
      else {
        Object.keys(body).forEach(key => {
          customerList[index][key] = body[key]
        })
      }

      return true
    })
  })

  it('Should register a customer profile', async () => {
    const req = {
      user: { id: 1 },
      body: { ...customerData }
    }

    const result = await CustomerController.upsertCustomer(req, res)

    expect(result['status']).toBeDefined()
    expect(result['status']).toEqual(200)
    expect(customerList.length).toBe(2)
    expect(customerList[1].user).toBe(1)
  })

  it('Should update a customer profile', async () => {
    const req = {
      user: { id: 0 },
      body: {
        phone: '11888888888'
      }
    }

    const result = await CustomerController.upsertCustomer(req, res)

    expect(result['status']).toBeDefined()
    expect(result['status']).toEqual(200)
    expect(customerList[0].phone).toBe('11888888888')
  })

})

describe('Get customer', () => {

  beforeAll(() => {
    Customer.findOne.mockImplementation(({ user }) => {
      return {
        populate: () => customerList.find(customer => {
          return customer.user === user
        })
      }
    })
  })

  it('Should return the customer', async () => {
    const req = {
      user: { id: 0 }
    }

    const result = await CustomerController.getCustomer(req, res)

    expect(result['status']).toBeDefined()
    expect(result['status']).toEqual(200)
  })

  it('Should return an unregistered customer error', async () => {
    const req = {
      user: { id: 1 }
    }

    const result = await CustomerController.getCustomer(req, res)

    expect(result['error']).toBeDefined()
    expect(result).toEqual({ 'error': errors.customerNotFound })
  })

})

describe('Get customer by id', () => {

  beforeAll(() => {
    Customer.findById.mockImplementation((id) => {
      return {
        populate: () => customerList.find(customer => {
          return customer.id === id
        })
      }
    })
  })

  it('Should return the customer', async () => {
    const req = {
      params: { id: 0 }
    }

    const result = await CustomerController.getCustomerById(req, res)

    expect(result['status']).toBeDefined()
    expect(result['status']).toEqual(200)
  })

  it('Should return an unregistered customer error', async () => {
    const req = {
      params: { id: 1 }
    }

    const result = await CustomerController.getCustomerById(req, res)

    expect(result['error']).toBeDefined()
    expect(result).toEqual({ 'error': errors.customerNotFound })
  })

})