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

      return res.send({ user })
    }
    catch (e) {
      return res.status(500).send({
        error: e.message
      })
    }
  },

  authenticateUser: async (req, res) => {

    const { email, role } = req.body

    try {
      const user = User.findOne({ email })

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
    }
    catch (e) {
      return res.status(500).send({
        error: e.message
      })
    }

  }

}