const { User } = require('../models')

class UsersController {
  constructor() {}

  //temp route
  static viewAll(req, res, next) {
    User.index()
      .then(users => res.json({ users }))
      .catch(err => next(err))
  }

  static create(req, res, next) {
      let {first_name, email, phone, password} = req.body
      if (!first_name)
        throw new Error('missingFirstName')
      if (!email)
        throw new Error('missingEmail')
      if (!phone)
        throw new Error('missingPhone')
      if (!password)
        throw new Error('missingPassword')
      // Verify that email is unique
      User.getUserIdByEmail(email)
        .then(existingUser => {
          if (existingUser) throw new Error('duplicateUser')
            // If unique, add new user to database; all new users created with role of 'user'
          return User.create(first_name, last_name, email, password)
        })
      // Sign and return a token for the new user
        .then(newUserId => Token.sign(newUserId[0].id))
      // Return token to client
        .then(token => res.status(201).json({response: token})).catch(next)
        .catch(err => next(err))
    }


}

module.exports = UsersController
