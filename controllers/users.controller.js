const { User, Token, Cart, Product } = require('../models')
const bcrypt = require('bcryptjs')

class UsersController {
  constructor() {}

  //temp view all users route
  static viewAll(req, res, next) {
    User.index()
      .then(users => res.json({ users }))
      .catch(err => next(err))
  }

  static byToken(req, res, next) {
    let user
    let cart
    Token.verifyAndExtractHeaderToken(req.headers)
    .then(token => User.getUserById(token.sub.id))
    .then(userInfo => {
      if (!userInfo) throw new Error('noSuchUser')
      user = userInfo
      return Cart.searchByUser(user.id)
    })
    .then(cartItems => {
      cart = cartItems
      return Product.getAllProducts(user.zip)
    })
    .then(products => {
      return res.status(200).json({ response: user, cart, products })
    })
    .catch(err => next(Error('invalidToken')))
}

  static create(req, res, next) {
    let { first_name, zip, phone, password } = req.body
    let id
    // let token
    if (!first_name) throw new Error('missingFirstName')
    if (!zip) throw new Error('missingZip')
    if (!phone) throw new Error('missingPhone')
    if (!password) throw new Error('missingPassword')
    User.getUserIdByPhone(phone)
      .then(existingUser => {
        if (existingUser) throw new Error('duplicateUser')
        return User.create(first_name, zip, phone, password)
      })
      .then(newUserId => {
        return Cart.createCart(newUserId[0].id)
      })
      .then(userId => {
        id = userId[0].id
        return Token.sign(id)
      })
      .then(token => {
        // token = signedToken
        // return Product.getAllProducts(zip)
        return res.status(201).set('Auth', `Bearer: ${token}`).json({ response: id, zip })
      })
      // .then(products => {
      //   // if (products.length) return res.status(201).set('Auth', `Bearer: ${token}`).json({ response: id })
      //   // Product.scrapeTrigger(zip)
      // })
      // .then(finished => {
      // })
      .catch(err => next(err))
  }

  static login(req, res, next) {
    const { phone, password } = req.body
    let id
    let cart
    if (!phone) throw new Error('missingPhone')
    if (!password) throw new Error('missingPassword')
    User.getUserIdByPhone(phone)
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
      .then(token => res.status(201).set('Auth', `Bearer: ${token}`).json({ response: id, cart }))
      .catch(err => next(err))
  }


}

module.exports = UsersController
