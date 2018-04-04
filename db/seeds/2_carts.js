exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('carts').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { id: 1, user_id: 1 },
        { id: 2, user_id: 2 }
      ])
    }).then(() => {
      return knex.raw(
        `SELECT setval('users_id_seq', (SELECT MAX(id) FROM carts));`
      )
    })
}
