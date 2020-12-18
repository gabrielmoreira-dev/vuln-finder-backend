const User = require('../data/model/user')

module.exports = {
  registerUser: async (req, res) => {
    const { email } = req.body

    try {
      if (await User.findOne({ email })) {
        return res.status(400).send({
          error: 'User already registered'
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
  }
}