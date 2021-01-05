const submitRequest = async ({ uc, params, errorCallback }) => {
  try {
    return await uc.getFuture(params)
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

module.exports = {
  submitRequest,
  assertTrue,
  assertFalse,
  assertNull,
  assertEquals,
  assertErrorType
}