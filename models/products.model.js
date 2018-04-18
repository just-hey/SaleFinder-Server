const db = require('../db/knex.js')
const knex = require('../db/knex')
const axios = require('axios')

class Product {
  constructor() {}

  static checkViaZip(zip) {
    return knex('products')
      .where({ zip })
  }

  static checkForSMSMatch(searchName, zip, phone, first_name) {
    return knex('products')
      .where({ zip })
      .then(items => {
        let matches = items.filter(item => {
          if (item.name.toLowerCase().includes(searchName.toLowerCase())) {
            item.phone = phone
            item.first_name = first_name
            return item
          }
        })
        return matches
      })
  }

  static getAllProducts(zip) {
    let returningProducts = []
    return knex('products')
      .where({ zip })
      .then(products => {
        if (products) products.forEach(product => returningProducts.push(product))
        if (zip === 'local') return returningProducts
        return knex('products')
          .where({ zip: 'local' })
          .then(localProducts => {
            localProducts.forEach(product => returningProducts.push(product))
            return returningProducts
          })
      })
  }

  static searchByIDLocal(id) {
    return knex('products')
      .where({ id })
  }

  static searchByNameLocal(name, zip) {
    return knex('products')
      .where({ name, zip })
      .first()
  }

  static createProduct(product) {
    return knex('products')
      .insert(product, '*')
  }

  static deleteByWeek(week) {
    return knex('products')
      .where({ week })
      .del()
  }

}

module.exports = Product
