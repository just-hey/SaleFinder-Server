const db = require('../db/knex.js')
const knex = require('../db/knex')
const axios = require('axios')
const bcrypt = require('bcryptjs')

class User {
  constructor() {}

  static index() {
    return knex('users')
  }

  static getUserById(id) {
    return db('users')
    .select('id', 'first_name', 'email', 'phone')
    .where({ id })
    .first()
  }

  static getUserIdByEmail(email) {
    return db('users')
    .select('id')
    .where({ email })
    .first()
  }

  static create(first_name, email, phone, password) {
    let hashed_password = bcrypt.hashSync(password)
    return db('users')
    .insert({ first_name, email, phone, hashed_password })
    // note that 'role' is automatically defaulted to 'user' by the db
    .returning(['id'])
  }

}

module.exports = User
