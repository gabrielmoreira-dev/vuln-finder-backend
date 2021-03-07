const jwt = require('jsonwebtoken')
jest.mock('jsonwebtoken')
const generateError = require('../../../../lib/interface/common/generate_error')
jest.mock('../../../../lib/interface/common/generate_error')

const SecurityPreHandler = require('../../../../lib/interface/common/security_pre_handler')
const { makeRequest, assertTrue } = require('../../../common/utils')

const NextSpy = class {
  nextIsCalled = false

  next = () => {
    this.nextIsCalled = true
  }
}

describe("Authenticate", () => {
  beforeAll(() => {
    jwt.verify.mockReturnValueOnce(true).mockReturnValue(false)
  })

  it("Verifies if next is called", async () => {
    const nextSpy = new NextSpy()
    const req = makeRequest({ token: "Bearer accessToken" })

    await SecurityPreHandler.checkUserIsAuthenticated(req, null, nextSpy.next)

    assertTrue(nextSpy.nextIsCalled)
  })

  it("Verifies if generate error is called", async () => {
    let generateErrorIsCalled = false
    generateError.mockImplementation((_, __, ___) => generateErrorIsCalled = true)
    const req = makeRequest({ token: "Bearer accessToken" })

    await SecurityPreHandler.checkUserIsAuthenticated(req, null, null)

    assertTrue(generateErrorIsCalled)
  })
})

describe("Authorize", () => {
  it("Verifies if next is called", async () => {
    const nextSpy = new NextSpy()
    const req = makeRequest({ role: "Customer" })

    const checkUserIsAuthorized = SecurityPreHandler.checkUserIsAuthorized(["Customer"])
    await checkUserIsAuthorized(req, null, nextSpy.next)

    assertTrue(nextSpy.nextIsCalled)
  })

  it("Verifies if generate error is called", async () => {
    let generateErrorIsCalled = false
    generateError.mockImplementation((_, __, ___) => generateErrorIsCalled = true)
    const req = makeRequest({ role: "Customer" })

    const checkUserIsAuthorized = SecurityPreHandler.checkUserIsAuthorized(["Professional"])
    await checkUserIsAuthorized(req, null, null)

    assertTrue(generateErrorIsCalled)
  })
})