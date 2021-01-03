const submitRequest = async ({ uc, params }) => await uc.getFuture(params)

const assertTrue = value => expect(value).toBeTruthy()

const assertFalse = value => expect(value).toBeFalsy()

module.exports = {
  submitRequest,
  assertTrue,
  assertFalse
}