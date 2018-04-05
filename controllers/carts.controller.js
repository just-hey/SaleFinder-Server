const { Cart, User } = require('../models')

class CartsController {
  constructor() {}

  static searchByUser(req, res, next) {
    Cart.searchByUser(req.params.userid)
      .then(cart => {
        if (!cart) throw new Error('noCartFound')
        return res.status(200).json({ cart })
      })
      .catch(console.error)
  }

  static createCart(req, res, next) {
    let user_id = req.params.userid
    User.getUserById(user_id)
      .then(user => {
        if (!user) throw new Error('usernotfound')
        return Cart.searchByUser(user_id)
      })
      .then(found => {
        if (found) throw new Error('duplicateCart')
        return Cart.createCart(user_id)
      })
      .then(cart => res.status(200).json({ cart }))
      .catch(console.error)
  }

  static addToCart(req, res, next) {
    let { product_id } = req.body
    let user_id = req.params.userid
    Cart.searchByUser(user_id)
      .then(found => {
        if (!found) throw new Error('noCartFound')
        return Cart.checkForProduct(user_id, product_id)
      })
      .then(hasProduct => {
        if(hasProduct) throw new Error('alreadyInCart')
        return Cart.addToCart(user_id, product_id)
      })
      .then(cart => res.status(202).json({ cart }))
  }

  static removeFromCart(req, res, next) {
    let { product_id } = req.body
    let user_id = req.params.userid
    Cart.searchByUser(user_id)
      .then(found => {
        if (!found) throw new Error('noCartFound')
        return Cart.checkForProduct(user_id, product_id)
      })
      .then(foundProduct => {
        if(!foundProduct) throw new Error('notInCart')
        return Cart.removeFromCart(foundProduct)
      })
      .then(cart => res.status(202).json({ cart }))
  }

}

module.exports = CartsController
