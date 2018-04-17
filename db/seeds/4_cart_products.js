exports.seed = function(knex, Promise) {
  return knex('cart_products').del()
    .then(function () {
      return knex('cart_products').insert([
        { id: 1, cart_id: 1, productString: 'cheese' },
        { id: 2, cart_id: 1, productString: 'banana' },
        { id: 3, cart_id: 1, productString: 'beer' },
        { id: 4, cart_id: 1, productString: 'bread' },
        { id: 5, cart_id: 1, productString: 'bacon' },
        { id: 6, cart_id: 1, productString: 'apples' },
        { id: 7, cart_id: 2, productString: 'cheese' },
        { id: 8, cart_id: 2, productString: 'banana' },
        { id: 9, cart_id: 2, productString: 'beer' },
        { id: 10, cart_id: 2, productString: 'bread' },
        { id: 11, cart_id: 2, productString: 'bacon' },
        { id: 12, cart_id: 2, productString: 'apples' },
        { id: 13, cart_id: 2, productString: 'gatorade' }
      ])
    })
    .then(() => {
      return knex.raw(
        `SELECT setval('cart_products_id_seq', (SELECT MAX(id) FROM cart_products));`
      )
    })
}
