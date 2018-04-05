const db = require('../db/knex.js')
const knex = require('../db/knex')
const axios = require('axios')

class User {
  constructor() {}

  static index() {
    return knex('users')
  }

  static getUserById (id) {
    return db('users')
    .select('id', 'first_name', 'email', 'phone')
    .where({ id })
    .first()
  }

  static getUserIdByEmail (email) {
    return db('users')
    .select('id')
    .where({ email })
    .first()
  }

}

module.exports = User
