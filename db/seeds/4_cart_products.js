exports.seed = function(knex, Promise) {
  return knex('cart_products').del()
    .then(function () {
      return knex('cart_products').insert([
        { id: 1, cart_id: 1, productString: 'cheese', week: 15 },
        { id: 2, cart_id: 1, productString: 'banana', week: 15 },
        { id: 3, cart_id: 1, productString: 'beer', week: 15 },
        { id: 4, cart_id: 1, productString: 'bread', week: 15 },
        { id: 5, cart_id: 1, productString: 'bacon', week: 15 },
        { id: 6, cart_id: 1, productString: 'apples', week: 15 },
        { id: 7, cart_id: 2, productString: 'cheese', week: 15 },
        { id: 8, cart_id: 2, productString: 'banana', week: 15 },
        { id: 9, cart_id: 2, productString: 'beer', week: 15 },
        { id: 10, cart_id: 2, productString: 'bread', week: 15 },
        { id: 11, cart_id: 2, productString: 'bacon', week: 15 },
        { id: 12, cart_id: 2, productString: 'apples', week: 15 },
        { id: 13, cart_id: 2, productString: 'gatorade', week: 15 }
      ])
    })
    .then(() => {
      return knex.raw(
        `SELECT setval('cart_products_id_seq', (SELECT MAX(id) FROM cart_products));`
      )
    })
}
