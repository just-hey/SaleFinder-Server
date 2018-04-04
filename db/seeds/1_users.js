exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { id: 1, first_name: 'Tester', email: 'test@test.com', phone: '9705896644', hashed_password: 'words' },
        { id: 2, first_name: 'Tester2', email: 'test2@test.com', phone: '9705896644', hashed_password: 'words' }
      ])
    }).then(() => {
      return knex.raw(
        `SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));`
      )
    })
}
