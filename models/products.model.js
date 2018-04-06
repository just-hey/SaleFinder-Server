const db = require('../db/knex.js')
const knex = require('../db/knex')
const axios = require('axios')

class Product {
  constructor() {}

  static getAllProducts() {
    return knex('products')
  }

  static searchByNameForeign(name) {
    // axios calls to supermarketAPI to get generic info then that data will be sent to text and user's cart?
    return axios.get(`https://www.iamdata.co/v1/products?name=${name}&full_resp=true&client_id=${process.env.IAMDATA_KEY}&client_secret=${process.env.IAMDATA_SECRET}`)
    .then(result => {
      return result.data.result.map(item => {
        return { name: item.name, image: item.large_image, upc: item.upc || 'UPC - not on file' }
      })
    })
    .catch(console.error)
  }

  static searchByIDLocal(id) {
    return knex('products')
      .where({ id })
  }

  static searchByNameLocal(name) {
    return knex('products')
      .where({ name })
      .first()
  }

  static createProduct(product) {
    return knex('products')
      .insert(product, '*')
  }

}

module.exports = Product
