const Controller = require('../common/controller')
const { GetAccessTokenUCParams } = require('../../../domain/use_case/get_access_token_uc')
const { InsertUserUCParams } = require('../../../domain/use_case/insert_user_uc')
const { ValidateEmailFormatUCParams } = require('../../../domain/use_case/validate_email_format_uc')
const { ValidatePasswordFormatUCParams } = require('../../../domain/use_case/validate_password_format_uc')
const { ValidateUserPasswordUCParams } = require('../../../domain/use_case/validate_user_password_uc')
const { ValidateUserPermissionUCParams } = require('../../../domain/use_case/validate_user_permission_uc')

const AuthController = class extends Controller {
  constructor({
    getAccessTokenUC,
    insertUserUC,
    validateEmailFormatUC,
    validatePasswordFormatUC,
    validateUserPasswordUC,
    validateUserPermissionUC,
  }) {
    super()
    this.getAccessTokenUC = getAccessTokenUC
    this.insertUserUC = insertUserUC
    this.validateEmailFormatUC = validateEmailFormatUC
    this.validatePasswordFormatUC = validatePasswordFormatUC
    this.validateUserPasswordUC = validateUserPasswordUC
    this.validateUserPermissionUC = validateUserPermissionUC
  }

  registerUser = async req => {
    const { name, email, password, role } = req.body
    this.validateEntryParameters([name, email, password, role])
    await this.validateUserCredentialsFormat({ email, password })
    await this.insertUserUC
      .getFuture(new InsertUserUCParams(name, email, password, role))
    return await this.getAccessTokenUC
      .getFuture(new GetAccessTokenUCParams(email))
  }

  authenticateUser = async req => {
    const { email, password, role } = req.body
    this.validateEntryParameters([email, password, role])
    await this.validateUserCredentialsFormat({ email, password })
    await this.validateUserPermissionUC
      .getFuture(new ValidateUserPermissionUCParams(email, [role]))
    await this.validateUserPasswordUC
      .getFuture(new ValidateUserPasswordUCParams(email, password))
    return await this.getAccessTokenUC
      .getFuture(new GetAccessTokenUCParams(email))
  }

  validateUserCredentialsFormat = async ({ email, password }) => {
    await this.validateEmailFormatUC
      .getFuture(new ValidateEmailFormatUCParams(email))
    await this.validatePasswordFormatUC
      .getFuture(new ValidatePasswordFormatUCParams(password))
  }
}

module.exports = AuthController