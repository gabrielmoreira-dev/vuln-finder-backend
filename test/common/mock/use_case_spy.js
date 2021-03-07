/* istanbul ignore file */

module.exports = class {
  useCaseIsCalled = false

  getFuture = _ => {
    this.useCaseIsCalled = true
  }
}