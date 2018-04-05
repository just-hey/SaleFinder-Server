const db = require('../db/knex.js')
const knex = require('../db/knex')
const axios = require('axios')

class Cart {
  constructor() {}

  static searchByUser(id) {
    console.log('model firing');
    return knex('carts')
      .where({ user_id: id })
      .first()
      // .then(data => {
      //   console.log('deep model')
      //   return data
      // })
  }

}

module.exports = Cart
