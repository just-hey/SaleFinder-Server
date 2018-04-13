const { Token } = require('../models')

class AuthController {
  constructor() {}

  static isCurrent (req, res, next) {
    Token.verifyAndExtractHeaderToken(req.headers)
    .catch(err => { throw new Error('invalidToken') })
    .then(token => UserModel.getUser(token.sub.id))
    .then(user => {
      if (!user) throw new Error('requestorInvalid')
      next()
    })
    .catch(next)
  }

}

module.exports = AuthController
