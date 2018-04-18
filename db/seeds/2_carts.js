exports.seed = function(knex, Promise) {
  return knex('carts').del()
    .then(function () {
      return knex('carts').insert([
        { id: 1, user_id: 1, zip: '98177' },
        { id: 2, user_id: 2, zip: '90210' }
      ])
    }).then(() => {
      return knex.raw(
        `SELECT setval('carts_id_seq', (SELECT MAX(id) FROM carts));`
      )
    })
}
