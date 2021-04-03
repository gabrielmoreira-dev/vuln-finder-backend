/* istanbul ignore file */

module.exports = class {
  result = null
  useCaseIsCalled = false

  constructor(result) {
    this.result = result
  }

  getFuture = _ => {
    this.useCaseIsCalled = true
    return this.result
  }
}