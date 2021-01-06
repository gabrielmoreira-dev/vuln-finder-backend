const Controller = require('../common/controller')
const { GetAccessTokenUCParams } = require('../../../domain/use_case/get_access_token_uc')
const { InsertUserUCParams } = require('../../../domain/use_case/insert_user_uc')
const { ValidateEmailFormatUCParams } = require('../../../domain/use_case/validate_email_format_uc')
const { ValidatePasswordFormatUCParams } = require('../../../domain/use_case/validate_password_format_uc')

const AuthController = class extends Controller {
  constructor({
    getAccessTokenUC,
    insertUserUC,
    validateEmailFormatUC,
    validatePasswordFormatUC
  }) {
    super()
    this.getAccessTokenUC = getAccessTokenUC
    this.insertUserUC = insertUserUC
    this.validateEmailFormatUC = validateEmailFormatUC
    this.validatePasswordFormatUC = validatePasswordFormatUC
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

  validateUserCredentialsFormat = async ({ email, password }) => {
    await this.validateEmailFormatUC
      .getFuture(new ValidateEmailFormatUCParams(email))
    await this.validatePasswordFormatUC
      .getFuture(new ValidatePasswordFormatUCParams(password))
  }
}

module.exports = AuthController

// module.exports = {

//   registerUser: async (req, res) => {
//     const { email, password } = req.body

//     try {
//       if (await User.findOne({ email })) {
//         return generateError(res, 400, errors.userAlreadyRegistered)
//       }

//       if (password.length < 8) {
//         return generateError(res, 400, errors.invalidPasswordFormat)
//       }

//       const user = await User.create(req.body)

//       return res.send({
//         token: generateToken({ id: user.id, role: user.role })
//       })
//     }
//     catch (e) {
//       return generateError(res, 500, e.message)
//     }
//   },

//   authenticateUser: async (req, res) => {
//     const { email, password, role } = req.body

//     try {
//       const user = await User.findOne({ email }).select('+password')

//       if (!user) {
//         return generateError(res, 400, errors.userNotFound)
//       }

//       if (user.role != role) {
//         return generateError(res, 400, errors.invalidPermission)
//       }

//       if (!await bcrypt.compare(password, user.password)) {
//         return generateError(res, 400, errors.invalidPassword)
//       }

//       return res.send({
//         token: generateToken({ id: user.id, role: user.role })
//       })

//     }
//     catch (e) {
//       return generateError(res, 500, e.message)
//     }
//   }

// }

// const generateToken = (params = {}) => {
//   return jwt.sign(params, process.env.JWT_HASH, {
//     expiresIn: 86400
//   })
// }