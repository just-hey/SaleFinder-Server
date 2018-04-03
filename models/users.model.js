const db = require('../db/knex.js')
const knex = require('knex')
const axios = require('axios')

class User {
  constructor() {}

  static index() {
    //false for now...
    // return knex('users')
  }
}

module.exports = User
