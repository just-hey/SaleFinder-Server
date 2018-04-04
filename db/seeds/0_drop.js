
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cart_items').del()
    .then(() => knex('items').del())
    .then(() => knex('carts').del())
    .then(() => knex('users').del())
}
