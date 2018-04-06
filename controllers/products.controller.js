const { Product } = require('../models')
const levenshtein = require('fast-levenshtein')

class ProductsController {
  constructor() {}

  static getAllProducts(req, res, next) {
    Product.getAllProducts()
      .then(products => res.json({ products }))
      .catch(err => next(err))
  }

  static searchByNameForeign(req, res, next) {
    Product.searchByNameForeign(req.params.name)
      .then(product => res.json({ product }))
      .catch(err => next(err))
  }

  static searchByNameLocal(req, res, next) {
    let incomingName = req.params.name
    Product.getAllProducts()
      .then(products => {
        let matches = products.filter(product => product.name.toLowerCase().includes(incomingName.toLowerCase()))
        if (!matches || matches.length < 1) throw new Error('nomatchesfound')
        return res.json({ matches })
      })
      .catch(err => next(err))
  }

  static createProduct(req, res, next) {

    let { products } = req.body
    products.forEach(incoming => {
      Product.searchByNameLocal(incoming.name)
        .then(exists => {
          if (exists) throw new Error('duplicateProduct')
          return Product.createProduct(incoming)
        })
        .catch(err => next(err))
    })
    return res.status(200).json({ message: 'Call complete' })
  }
}

module.exports = ProductsController
