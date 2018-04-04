exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cart_items').del()
    .then(function () {
      // Inserts seed entries
      return knex('cart_items').insert([
        { id: 1, cart_id: 1, item_id: 1 },
        { id: 2, cart_id: 1, item_id: 2 },
        { id: 3, cart_id: 1, item_id: 3 },
        { id: 4, cart_id: 1, item_id: 4 },
        { id: 5, cart_id: 1, item_id: 5 },
        { id: 6, cart_id: 1, item_id: 6 },
        { id: 7, cart_id: 2, item_id: 1 },
        { id: 8, cart_id: 2, item_id: 2 },
        { id: 9, cart_id: 2, item_id: 3 },
        { id: 10, cart_id: 2, item_id: 4 },
        { id: 11, cart_id: 2, item_id: 5 },
        { id: 12, cart_id: 2, item_id: 6 },
        { id: 13, cart_id: 2, item_id: 7 }
      ])
    }).then(() => {
      return knex.raw(
        `SELECT setval('cart_items_id_seq', (SELECT MAX(id) FROM cart_items));`
      )
    })
}
