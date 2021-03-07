const { ValidateEmailFormatUC, ValidateEmailFormatUCParams } = require('../../../domain/use_case/validate_email_format_uc')
const { InvalidCredentialsError } = require('../../../domain/errors')
const { submitUCRequest, assertNull, assertErrorType } = require('../../common/utils')

describe("Validate email format", () => {
  it("Should not return any error if the email is valid", async () => {
    const validateEmailFormatUC = makeUseCase()
    const validEmail = 'test@test.com'
    const params = makeParams({ email: validEmail })
    let error = null
    const errorCallback = e => error = e

    await submitUCRequest({
      uc: validateEmailFormatUC,
      params: params,
      errorCallback: errorCallback
    })

    assertNull(error)
  })

  it("Should return an invalid email format error", async () => {
    const validateEmailFormatUC = makeUseCase()
    const invalidEmail = 'test'
    const params = makeParams({ email: invalidEmail })
    let error = null
    const errorCallback = e => error = e

    await submitUCRequest({
      uc: validateEmailFormatUC,
      params: params,
      errorCallback: errorCallback
    })

    assertErrorType(error, InvalidCredentialsError)
  })
})

const makeUseCase = _ => new ValidateEmailFormatUC()

const makeParams = ({ email }) => new ValidateEmailFormatUCParams(email)