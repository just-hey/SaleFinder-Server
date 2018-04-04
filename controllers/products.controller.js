const { Product } = require('../models')

class ProductsController {
  constructor() {}

  static searchByName (req, res, next) {
    Product.searchByName(req.params.name)
      .then(product => {
        return res.json({ product })
      })
      .catch(err => {
        console.log('Error!', err)
      })
  }
}

module.exports = ProductsController
