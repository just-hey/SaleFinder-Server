const { Cart, User, Product } = require('../models')

class CartsController {
  constructor() {}

  static searchByUser(req, res, next) {
    Cart.searchByUser(req.params.userid)
      .then(cart => {
        if (!cart) throw new Error('noCartFound')
        return res.status(200).json({ cart })
      })
      .catch(err => next(err))
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
      .catch(err => next(err))
  }

  static addOrRemove (req, res, next) {
    let { user_id, product_id } = req.body
    Cart.addOrRemove(user_id, product_id)
      .then(productIds => {
        return productIds.filter(id => {
          return Product.searchByIDLocal(id)
        })
      })
      .then(cart => {
        return res.status(200).json({ cart })
      })
      .catch(console.error)
  }

}

module.exports = CartsController
