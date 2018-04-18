exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        { id: 1, first_name: 'Tester', phone: '1111111111', zip: '98177', hashed_password: '$2a$10$sdaQ1PxvHrtTrKxD6DoBkumSKucRsxN8CIQR6BVyrBIUxHiL9OXkC' },
        { id: 2, first_name: 'Tester2', phone: '9999999999', zip: '90210', hashed_password: '$2a$10$sdaQ1PxvHrtTrKxD6DoBkumSKucRsxN8CIQR6BVyrBIUxHiL9OXkC' }
      ])
    }).then(() => {
      return knex.raw(
        `SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));`
      )
    })
}
