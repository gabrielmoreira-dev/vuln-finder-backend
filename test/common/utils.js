/* istanbul ignore file */

const makeRequest = ({ token, userId, id, role, body }) => {
  return {
    headers: {
      authorization: token
    },
    user: {
      id: userId,
      role: role
    },
    params: {
      id: id
    },
    body: body
  }
}

const submitUCRequest = async ({ uc, params, errorCallback }) => {
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

const assertHaveBeenCalled = func => expect(func).toHaveBeenCalled()

const assertContains = (obj, array) => expect(array).toContain(obj)

module.exports = {
  makeRequest,
  submitUCRequest,
  assertTrue,
  assertFalse,
  assertNull,
  assertEquals,
  assertErrorType,
  assertHaveBeenCalled,
  assertContains
}