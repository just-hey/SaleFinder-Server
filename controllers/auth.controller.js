const { Token, User } = require('../models')

class AuthController {
  constructor() {}

  static verifyUser (req, res, next) {
    let { user_id } = req.body
    Token.verifyAndExtractHeaderToken(req.headers)
      .catch(err => { throw new Error('invalidToken') })
      .then(token => User.getUserById(token.sub.id))
      .then(user => {
        if (!user) throw new Error('requestorInvalid')
        if (user.id != user_id) throw new Error('unauthorizedUser')
        next()
      })
      .catch(next)
  }

}

module.exports = AuthController
