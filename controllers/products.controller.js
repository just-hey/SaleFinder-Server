const { Product } = require('../models')
const levenshtein = require('fast-levenshtein')
const axios = require('axios')

class ProductsController {
  constructor() {}

  static searchByIDLocal(req, res, next) {
    let { ids } = req.body
    let products = ids.map(id => {
      Product.searchByIDLocal(id)
      .then(product => product)
      .catch(err => next(err))
    })
    return res.json({ products })
  }

  static getAllProducts(req, res, next) {
    let { zip } = req.body
    Product.getAllProducts(zip)
      .then(products => res.json({ products }))
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

  static async scrapeTrigger(zip) {
    return axios.get(`${process.env.CRAWLERS_URL}scrape/${zip}`)
  }

  static async createProduct(req, res, next) {
    let { products } = req.body
    await products.forEach(incoming => {
      Product.searchByNameLocal(incoming.name, incoming.zip)
        .then(exists => {
          if (exists) throw new Error('duplicateProduct')
          return Product.createProduct(incoming)
        })
        .catch(err => next(err))
    })
    return res.status(200).json({ message: 'Call complete' })
  }

  static deleteByWeek(req, res, next) {
    let { week } = req.params
    Product.deleteByWeek(week)
      .then(countRemoved => res.status(200).json({ message: `Total of ${ countRemoved } products deleted.` }))
      .catch(err => next(err))
  }

}

module.exports = ProductsController
