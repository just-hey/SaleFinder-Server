const db = require('../db/knex.js')
const knex = require('../db/knex')
const axios = require('axios')

class Cart {
  constructor() {}

  static searchByUser(id) {
    return knex('carts')
      .where({ user_id: id })
      .first()
      .then(cart => {
        let cart_id = cart.id
        return knex('cart_products')
          .where({ cart_id })
      })
  }

  static createCart(id) {
    return knex('carts')
      .insert({ user_id: id })
      .returning(['*'])
  }

  static checkForProduct(user_id, product_id) {
    return knex('carts')
      .where({ user_id })
      .first()
      .then(cart => {
        let cart_id = cart.id
        return knex('cart_products')
          .where({ cart_id, product_id })
          .first()
          .then(data => {
            return data
          })
      })
  }

  static addToCart(user_id, product_id) {
    return knex('carts')
      .where({ user_id })
      .first()
      .then(cart => {
        let cart_id = cart.id
        return knex('cart_products')
          .insert({ cart_id, product_id })
          .returning('*')
      })
  }

  static removeFromCart(foundProduct) {
    return knex('cart_products')
      .where({ id: foundProduct.id })
      .del()
      .returning('*')
  }

}

module.exports = Cart
