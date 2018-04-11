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
      .select('id', 'first_name', 'zip', 'phone')
      .where({ id })
      .first()
  }

  static getUserIdByPhone(phone) {
    return db('users')
      .select('id', 'hashed_password')
      .where({ phone })
      .first()
  }

  static create(first_name, zip, phone, password) {
    let hashed_password = bcrypt.hashSync(password)
    return db('users')
      .insert({ first_name, zip, phone, hashed_password })
      .returning(['id'])
  }

}

module.exports = User
