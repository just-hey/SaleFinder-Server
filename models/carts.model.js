const db = require('../db/knex.js')
const knex = require('../db/knex')
const axios = require('axios')

class Cart {
  constructor() {}

  static searchByUser(id) {
    return knex('carts')
      .where({ user_id: id })
      .join('cart_products', 'cart_products.cart_id', 'carts.id')
      .join('products', 'products.id', 'cart_products.product_id')
  }

  static createCart(id) {
    return knex('carts')
      .insert({ user_id: id })
      .returning(['*'])
  }

  static addOrRemove(id, product_id) {
    return knex('carts')
      .where({ user_id: id })
      .first()
      .then(cart => {
        let cart_id = cart.id
        return this.searchByUser(id)
          .then(cartProducts =>{
            let found = cartProducts.find(el => el.product_id === product_id)
            if (!found) {
              let itemToAdd = { cart_id, product_id }
              return knex('cart_products')
                .insert({ cart_id, product_id })
            } else {
              return knex('cart_products')
                .where({ cart_id, product_id })
                .del()
             }
          })
          .then(() => {
            return this.searchByUser(id)
          })
      })
  }

}

module.exports = Cart
