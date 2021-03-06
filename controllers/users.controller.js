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

  static fetchZip(req, res, next) {
    console.log('fetchZip triggered')
    User.fetchZip()
      .then(zip => {
        return res.json({ zip })
      })
      .catch(err => next(err))
  }

  static deleteZip(req, res, next) {
    let { id } = req.params
    User.deleteZip(id)
      .then(() => {
        return res.json({ message: 'Zip removed from list' })
      })
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
    console.log('incoming',first_name, zip, phone, password)
    let id
    if (!first_name) throw new Error('missingFirstName')
    if (!zip) throw new Error('missingZip')
    if (!phone) throw new Error('missingPhone')
    if (!password) throw new Error('missingPassword')
    User.getUserIdByPhone(phone)
      .then(existingUser => {
        console.log('checking if already user')
        if (existingUser) throw new Error('duplicateUser')
        return User.addZip(zip)
      })
      .then(() =>{
        console.log('actually making user')
        return User.create(first_name, zip, phone, password)
      })
      .then(newUserId => {
        console.log('make cart')
        return Cart.createCart(newUserId[0].id, zip)
      })
      .then(userId => {
        console.log('user made, ID = ', userId[0].id)
        id = userId[0].id
        return Token.sign(id)
      })
      .then(token => {
        console.log('token',token)
        return res.status(201).set('Auth', `Bearer: ${token}`).json({ response: id, zip })
      })
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

  static update(req, res, next) {
    let { id } = req.params
    let { first_name, zip, phone, password } = req.body
    if (phone) {
      User.getUserIdByPhone(phone)
        .then(existingUser => {
          if (existingUser) throw new Error('duplicateUser')
          return User.update(id, first_name, zip, phone, password)
        })
        .then(user_id => res.status(200).json({ response: user_id }))
        .catch(err => next(err))
    } else {
      User.update(id, first_name, zip, undefined, password)
        .then(user_id => res.status(200).json({ response: user_id }))
        .catch(err => next(err))
    }
  }

  static remove(req, res, next) {
    let { id } = req.params
    User.getUserById(id)
      .then(() => User.remove(id))
      .then(response => res.status(204).json({ message: `User account deleted.` }))
      .catch(next)
  }

}

module.exports = UsersController
