const { User } = require('../models')

class UsersController {
  constructor() {}

  static create (req, res, next) {
    User.index()
      .then(users => {
        return res.json({ users })
      })
      .catch(err => {
        console.log('Error!', err)
      })
  }
}

module.exports = UsersController
