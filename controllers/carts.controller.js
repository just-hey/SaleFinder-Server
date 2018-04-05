const { Cart } = require('../models')

class CartsController {
  constructor() {}

  static searchByUser (req, res, next) {
    console.log('ctrl firing');
    Cart.searchByUser(req.params.userid)
      .then(cart => {
        console.log('inner ctrl');
        return res.json({ cart })
      })
      .catch(err => {
        console.log('Error!', err)
      })
  }
}

module.exports = CartsController
