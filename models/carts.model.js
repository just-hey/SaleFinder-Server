const db = require('../db/knex.js')
const knex = require('../db/knex')
const axios = require('axios')

class Cart {
  constructor() {}

  static searchByUser(id) {
    return knex('carts')
      .where({ user_id: id })
      .first()
  }

}

module.exports = Cart
