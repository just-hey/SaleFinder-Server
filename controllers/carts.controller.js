const { Cart } = require('../models')

class CartsController {
  constructor() {}

  static searchByUser (req, res, next) {
    Cart.searchByUser(req.params.userid)
      .then(cart => {
        return res.json({ cart })
      })
      .catch(console.error)
  }
}

module.exports = CartsController
