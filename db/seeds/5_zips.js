
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('zips').del()
    .then(function () {
      // Inserts seed entries
      return knex('zips').insert([
        {id: 1, zip: '98104'},
        {id: 2, zip: '90210'}
      ])
    })
    .then(() => {
      return knex.raw(
        `SELECT setval('zips_id_seq', (SELECT MAX(id) FROM zips));`
      )
    })
}
