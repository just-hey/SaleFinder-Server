const db = require('../db/knex.js')
const knex = require('../db/knex')
const axios = require('axios')

class Cart {
  constructor() {}

  static searchByUser(user_id) {
    return knex('carts')
      .where({ user_id })
      .join('cart_products', 'cart_products.cart_id', 'carts.id')
  }

  static getAllCartItems() {
    return knex('cart_products')
  }

  static createCart(id, zip) {
    return knex('carts')
      .insert({ user_id: id, zip })
      .returning(['*'])
  }

  static addOrRemove(user_id, productString) {
    return knex('carts')
      .where({ user_id })
      .first()
      .then(cart => {
        let zip = cart.zip
        let cart_id = cart.id
        return this.searchByUser(user_id)
          .then(cartProducts => {
            let found = cartProducts.find(el => el.productString === productString)
            if (!found) {
              let itemToAdd = { cart_id, productString }
              return knex('cart_products')
                .insert({ cart_id, productString })
            } else {
              return knex('cart_products')
                .where({ cart_id, productString })
                .del()
             }
          })
          .then(() => {
            return knex('zips')
              .where({ zip })
              .first()
              .then(found => {
                if (found) return null
                return knex('zips')
                  .insert({ zip })
              })
          })
          .then(() => {
            return this.searchByUser(user_id)
          })
      })
  }

}

module.exports = Cart
