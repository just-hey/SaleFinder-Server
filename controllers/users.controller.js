const { User } = require('../models')

class UsersController {
  constructor() {}

  static create(req, res, next) {
    User.index()
      .then(users => res.json({ users }))
      .catch(err => next(err))
  }
}

module.exports = UsersController
