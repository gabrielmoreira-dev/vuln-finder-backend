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

const assertTrue = value => expect(value).toBeTruthy()

const assertFalse = value => expect(value).toBeFalsy()

const assertNull = value => expect(value).toBeNull()

const assertEquals = (a, b) => expect(a).toBe(b)

const assertErrorType = (error, type) => expect(error).toBeInstanceOf(type)

const assertHaveBeenCalled = func => expect(func).toHaveBeenCalled()

module.exports = {
  submitUCRequest,
  submitControllerRequest,
  assertTrue,
  assertFalse,
  assertNull,
  assertEquals,
  assertErrorType,
  assertHaveBeenCalled
}