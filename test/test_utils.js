const registeredUser = {
  id: 'REGISTERED_USER_ID',
  name: 'User',
  email: 'user@test.com',
  password: 'Abc123$#',
  role: 'Customer'
}

const unregisteredUser = {
  id: 'UNREGISTERED_USER_ID',
  name: 'User',
  email: 'user2@test.com',
  password: 'Abc123$#',
  role: 'Customer'
}

const registeredCustomer = {
  user: registeredUser,
  id: 'REGISTERED_CUSTOMER_ID',
  address: {},
  phone: '99999999'
}

const submitUCRequest = async ({ uc, params, errorCallback }) => {
  try {
    return await uc.getFuture(params)
  }
  catch (e) {
    errorCallback(e)
  }
}

const submitControllerRequest = async ({ func, request, errorCallback }) => {
  try {
    return await func(request)
  }
  catch (e) {
    errorCallback(e)
  }
}

const submitAuthorizationRequest = async ({ func, request, errorCallback, next = () => { } }) => {
  try {
    return await func(request, null, next)
  }
  catch (e) {
    errorCallback(e)
  }
}

const assertTrue = value => expect(value).toBeTruthy()

const assertFalse = value => expect(value).toBeFalsy()

const assertNull = value => expect(value).toBeNull()

const assertEquals = (a, b) => expect(a).toBe(b)

const assertErrorType = (error, type) => expect(error).toBeInstanceOf(type)

const assertHaveBeenCalled = func => expect(func).toHaveBeenCalled()

module.exports = {
  registeredUser,
  unregisteredUser,
  registeredCustomer,
  submitUCRequest,
  submitControllerRequest,
  submitAuthorizationRequest,
  assertTrue,
  assertFalse,
  assertNull,
  assertEquals,
  assertErrorType,
  assertHaveBeenCalled
}