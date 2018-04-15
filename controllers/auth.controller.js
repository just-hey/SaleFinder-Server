const { Token, User } = require('../models')

class AuthController {
  constructor() {}

  static isCurrent (req, res, next) {
    Token.verifyAndExtractHeaderToken(req.headers)
    .catch(err => { throw new Error('invalidToken') })
    .then(token => User.getUserById(token.sub.id))
    .then(user => {
      if (!user) throw new Error('requestorInvalid')
      next()
    })
    .catch(next)
  }

  static verifyUser (req, res, next) {
    const { id } = req.params
    // console.log(id, req.headers)
    Token.verifyAndExtractHeaderToken(req.headers)
      .catch(err => { throw new Error('invalidToken') })
      .then(token => User.getUserById(token.sub.id))
      .then(user => {
        console.log(user)
        if (!user) throw new Error('requestorInvalid')
        if (user.id != id) throw new Error('unauthorizedUser')
        next()
      })
      .catch(next)
  }

}

module.exports = AuthController
