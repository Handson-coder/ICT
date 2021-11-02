const { User } = require('../models')
const { signToken } = require('../helpers/jwt')
const { checkPassword } = require('../helpers/bcryptjs')

class ControllerUser {
  static async register(req, res, next) {
    const { username, email, password } = req.body
    try {
      const result = await User.create({ username, email, password })
      res.status(201).json({
        id: result.id,
        username: result.username,
        email: result.email
      })
    } catch (err) {
      next(err)
    }
  }

  static async login(req, res, next) {
    const { email, password } = req.body
    try {
      const user = await User.findOne({ where: { email } })
      if (!user) {
        throw ({ name: "Email/Password is wrong" })
      } else {
        if (checkPassword(password, user.password)) {
          const access_token = signToken({ id: user.id, email: user.email, role: user.role })
          res.status(200).json({ id: user.id, username: user.username, email: user.email, access_token })
        } else {
          throw ({ name: "Email/Password is wrong" })
        }
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = ControllerUser