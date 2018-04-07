exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        { id: 1, first_name: 'Tester', email: 'test@test.com', phone: '9705896644', hashed_password: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOjZ9LCJpYXQiOjE1MjMxMzk3OTYsImV4cCI6MTUyMzc0NDU5Nn0.-_ruTImCYzcWNBpnIL6OrYSc1CVEgJKTxgvTZRFKgAU' },
        { id: 2, first_name: 'Tester2', email: 'test2@test.com', phone: '9705896644', hashed_password: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOjZ9LCJpYXQiOjE1MjMxMzk3OTYsImV4cCI6MTUyMzc0NDU5Nn0.-_ruTImCYzcWNBpnIL6OrYSc1CVEgJKTxgvTZRFKgAU' }
      ])
    }).then(() => {
      return knex.raw(
        `SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));`
      )
    })
}
