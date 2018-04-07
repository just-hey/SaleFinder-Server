exports.seed = function(knex, Promise) {
  return knex('cart_products').del()
    .then(function () {
      return knex('cart_products').insert([
        { id: 1, cart_id: 1, product_id: 1 },
        { id: 2, cart_id: 1, product_id: 2 },
        { id: 3, cart_id: 1, product_id: 3 },
        { id: 4, cart_id: 1, product_id: 4 },
        { id: 5, cart_id: 1, product_id: 5 },
        { id: 6, cart_id: 1, product_id: 6 },
        { id: 7, cart_id: 2, product_id: 1 },
        { id: 8, cart_id: 2, product_id: 2 },
        { id: 9, cart_id: 2, product_id: 3 },
        { id: 10, cart_id: 2, product_id: 4 },
        { id: 11, cart_id: 2, product_id: 5 },
        { id: 12, cart_id: 2, product_id: 6 },
        { id: 13, cart_id: 2, product_id: 7 }
      ])
    })
}
