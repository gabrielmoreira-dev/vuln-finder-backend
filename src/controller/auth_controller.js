const User = require('../data/model/user')

module.exports = {
  registerUser: async (req, res) => {
    try {
      const user = await User.create(req.body)
      return res.send({ user })
    }
    catch (e) {
      return res.status(500).send({
        error: e.message
      })
    }
  }
}