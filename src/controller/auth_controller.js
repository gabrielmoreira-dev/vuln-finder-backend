const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../data/model/user')

module.exports = {

  registerUser: async (req, res) => {
    const { email, password } = req.body

    try {
      if (await User.findOne({ email })) {
        return res.status(400).send({
          error: 'User already registered'
        })
      }

      if (password.length < 8) {
        return res.status(400).send({
          error: 'Invalid password format'
        })
      }

      const user = await User.create(req.body)

      user.password = undefined

      return res.send({
        token: generateToken({ id: user.id, role: user.role })
      })
    }
    catch (e) {
      return res.status(500).send({
        error: e.message
      })
    }
  },

  authenticateUser: async (req, res) => {

    const { email, password, role } = req.body

    try {
      const user = await User.findOne({ email }).select('+password')

      if (!user) {
        return res.status(400).send({
          error: 'User not found'
        })
      }

      if (user.role != role) {
        return res.status(400).send({
          error: 'Invalid permission'
        })
      }

      if (!await bcrypt.compare(password, user.password)) {
        return res.status(400).send({
          error: 'Invalid password'
        })
      }

      return res.send({
        token: generateToken({ id: user.id, role: user.role })
      })

    }
    catch (e) {
      return res.status(500).send({
        error: e.message
      })
    }

  }

}

const generateToken = (params = {}) => {
  return jwt.sign(params, process.env.JWT_HASH, {
    expiresIn: 86400
  })
}