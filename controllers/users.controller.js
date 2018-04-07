const { User, Token, Cart } = require('../models')
const bcrypt = require('bcryptjs')

class UsersController {
  constructor() {}

  //temp route
  static viewAll(req, res, next) {
    User.index()
      .then(users => res.json({ users }))
      .catch(err => next(err))
  }

  static create(req, res, next) {
    let { first_name, email, phone, password } = req.body
    let id
    if (!first_name)
      throw new Error('missingFirstName')
    if (!email)
      throw new Error('missingEmail')
    if (!phone)
      throw new Error('missingPhone')
    if (!password)
      throw new Error('missingPassword')
    User.getUserIdByEmail(email)
      .then(existingUser => {
        if (existingUser) throw new Error('duplicateUser')
        return User.create(first_name, email, phone, password)
      })
      .then(newUserId => {
        return Cart.createCart(newUserId[0].id)
      })
      .then(userId => {
        id = userId[0].id
        return Token.sign(id)
      })
      .then(token => res.status(201).json({ response: token, id }))
      .catch(err => next(err))
  }

  static login(req, res, next) {
    const { email, password } = req.body
    let id
    let cart
    if (!email) throw new Error('missingEmail')
    if (!password) throw new Error('missingPassword')
    User.getUserIdByEmail(email)
      .then(user => {
        if (!user) throw new Error('noSuchUser')
        if (!bcrypt.compareSync(password, user.hashed_password)) throw new Error('noSuchUser')
        id = user.id
        return Cart.searchByUser(id)
      })
      .then(cartInfo =>{
        cart = cartInfo
        return Token.sign(id)
      })
      .then(token => res.status(201).json({ response: token, id, cart }))
      .catch(err => next(err))
  }


}

module.exports = UsersController
