const { Token, User } = require('../models')

class AuthController {
  constructor() {}

  static verifyUser (req, res, next) {
    const { id } = req.params
    Token.verifyAndExtractHeaderToken(req.headers)
      .catch(err => { throw new Error('invalidToken') })
      .then(token => User.getUserById(token.sub.id))
      .then(user => {
        if (!user) throw new Error('requestorInvalid')
        if (user.id != id) throw new Error('unauthorizedUser')
        next()
      })
      .catch(next)
  }

}

module.exports = AuthController
