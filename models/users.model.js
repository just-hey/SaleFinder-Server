const db = require('../db/knex.js')
const knex = require('../db/knex')
const axios = require('axios')
const bcrypt = require('bcryptjs')

class User {
  constructor() {}

// temp view all users route
  static index() {
    return knex('users')
  }

  static getUserById(id) {
    return db('users')
      .select('id', 'first_name', 'email', 'phone')
      .where({ id })
      .first()
      .then()
  }

  static getUserIdByEmail(email) {
    return db('users')
      .select('id', 'hashed_password')
      .where({ email })
      .first()
  }

  static create(first_name, email, phone, password) {
    let hashed_password = bcrypt.hashSync(password)
    return db('users')
      .insert({ first_name, email, phone, hashed_password })
      .returning(['id'])
  }

}

module.exports = User
