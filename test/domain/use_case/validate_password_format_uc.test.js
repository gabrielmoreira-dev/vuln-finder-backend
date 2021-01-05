const { ValidatePasswordFormatUC, ValidatePasswordFormatUCParams } = require('../../../domain/use_case/validate_password_format_uc')
const { InvalidPasswordLengthError, InvalidPasswordFormatError } = require('../../../domain/errors')
const { submitRequest, assertErrorType, assertNull } = require('../../test_utils')

const validPassword = 'Abc123@#'
const shortPassword = 'Abc123@'
const passwordWithoutUppercaseLetter = 'abc123@#'
const passwordWithoutLowercaseLetter = 'ABC123@#'
const passwordWithoutNumber = 'Abcd@#$%'
const passwordWithoutSpecialCharacter = 'Abcd1234'

describe("Validate password format", () => {
  it("Should not return an error if the password is valid", async () => {
    const validatePasswordFormatUC = makeUseCase()
    const params = makeParams({ password: validPassword })
    let error = null
    const errorCallback = e => error = e

    await submitRequest({
      uc: validatePasswordFormatUC,
      params: params,
      errorCallback: errorCallback
    })

    assertNull(error)
  })

  it("Should return an error if the passsword is less than 8 characters", async () => {
    const validatePasswordFormatUC = makeUseCase()
    const params = makeParams({ password: shortPassword })
    let error = null
    const errorCallback = e => error = e

    await submitRequest({
      uc: validatePasswordFormatUC,
      params: params,
      errorCallback: errorCallback
    })

    assertErrorType(error, InvalidPasswordLengthError)
  })

  it("Should return an error if the passsword does not contain uppercase letter", async () => {
    const validatePasswordFormatUC = makeUseCase()
    const params = makeParams({ password: passwordWithoutUppercaseLetter })
    let error = null
    const errorCallback = e => error = e

    await submitRequest({
      uc: validatePasswordFormatUC,
      params: params,
      errorCallback: errorCallback
    })

    assertErrorType(error, InvalidPasswordFormatError)
  })

  it("Should return an error if the passsword does not contain lowercase letter", async () => {
    const validatePasswordFormatUC = makeUseCase()
    const params = makeParams({ password: passwordWithoutLowercaseLetter })
    let error = null
    const errorCallback = e => error = e

    await submitRequest({
      uc: validatePasswordFormatUC,
      params: params,
      errorCallback: errorCallback
    })

    assertErrorType(error, InvalidPasswordFormatError)
  })

  it("Should return an error if the passsword does not contain number", async () => {
    const validatePasswordFormatUC = makeUseCase()
    const params = makeParams({ password: passwordWithoutNumber })
    let error = null
    const errorCallback = e => error = e

    await submitRequest({
      uc: validatePasswordFormatUC,
      params: params,
      errorCallback: errorCallback
    })

    assertErrorType(error, InvalidPasswordFormatError)
  })

  it("Should return an error if the passsword does not contain special characters", async () => {
    const validatePasswordFormatUC = makeUseCase()
    const params = makeParams({ password: passwordWithoutSpecialCharacter })
    let error = null
    const errorCallback = e => error = e

    await submitRequest({
      uc: validatePasswordFormatUC,
      params: params,
      errorCallback: errorCallback
    })

    assertErrorType(error, InvalidPasswordFormatError)
  })
})

const makeUseCase = _ => new ValidatePasswordFormatUC()

const makeParams = ({ password }) => new ValidatePasswordFormatUCParams(password)