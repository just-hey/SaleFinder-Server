const { Product } = require('../models')
const levenshtein = require('fast-levenshtein')

class ProductsController {
  constructor() {}

  static getAllProducts(req, res, next) {
    Product.getAllProducts()
      .then(products => {
        return res.json({ products })
      })
      .catch(console.error)
  }

  static searchByNameForeign(req, res, next) {
    Product.searchByNameForeign(req.params.name)
      .then(product => {
        return res.json({ product })
      })
      .catch(console.error)
  }

  static searchByNameLocal(req, res, next) {
    let incomingName = req.params.name
    Product.getAllProducts()
      .then(products => {
        let matches = products.filter(product => product.name.toLowerCase().includes(incomingName.toLowerCase()))
        console.log(matches);
        if (!matches || matches.length < 1) throw new Error('nomatchesfound')
        return res.json({ matches })
      })
      .catch(console.error)
  }

  static createProduct(req, res, next) {
    let { products } = req.body
    products.forEach(incoming => {
      Product.searchByNameLocal(incoming.name)
        .then(exists => {
          if (exists) throw new Error('duplicateProduct')
          return Product.createProduct(incoming)
        })
      // .then(product => {
      //   return res.json({ product })
      // })
      .catch(console.error)
    })
    return res.status(200).json({ message: 'Call complete' })
  }
}

module.exports = ProductsController
