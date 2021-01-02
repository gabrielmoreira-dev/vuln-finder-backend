const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const generateError = require('../../common/generate_error')
const errors = require('../../common/errors')
const User = require('../../data/remote/model/user_rm')

module.exports = {

  registerUser: async (req, res) => {
    const { email, password } = req.body

    try {
      if (await User.findOne({ email })) {
        return generateError(res, 400, errors.userAlreadyRegistered)
      }

      if (password.length < 8) {
        return generateError(res, 400, errors.invalidPasswordFormat)
      }

      const user = await User.create(req.body)

      return res.send({
        token: generateToken({ id: user.id, role: user.role })
      })
    }
    catch (e) {
      return generateError(res, 500, e.message)
    }
  },

  authenticateUser: async (req, res) => {
    const { email, password, role } = req.body

    try {
      const user = await User.findOne({ email }).select('+password')

      if (!user) {
        return generateError(res, 400, errors.userNotFound)
      }

      if (user.role != role) {
        return generateError(res, 400, errors.invalidPermission)
      }

      if (!await bcrypt.compare(password, user.password)) {
        return generateError(res, 400, errors.invalidPassword)
      }

      return res.send({
        token: generateToken({ id: user.id, role: user.role })
      })

    }
    catch (e) {
      return generateError(res, 500, e.message)
    }
  }

}

const generateToken = (params = {}) => {
  return jwt.sign(params, process.env.JWT_HASH, {
    expiresIn: 86400
  })
}