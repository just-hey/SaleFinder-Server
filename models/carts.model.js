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

  static addOrRemove(id, product_id) {
    return knex('carts')
      .where({ user_id: id })
      .first()
      .then(cart => {
        let cart_id = cart.id
        return knex('cart_products')
          .where({ cart_id, product_id })
          .first()
          .then(found =>{
            if (!found) {
              let itemToAdd = { cart_id, product_id }
              console.log('not found, now add this!', itemToAdd)
              return knex('cart_products')
               .insert({ cart_id, product_id })
            } else {
              console.log('found now delete this!', found);
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
