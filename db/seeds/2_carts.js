exports.seed = function(knex, Promise) {
  return knex('carts').del()
    .then(function () {
      return knex('carts').insert([
        { id: 1, user_id: 1 },
        { id: 2, user_id: 2 }
      ])
    }).then(() => {
      return knex.raw(
        `SELECT setval('carts_id_seq', (SELECT MAX(id) FROM carts));`
      )
    })
}
