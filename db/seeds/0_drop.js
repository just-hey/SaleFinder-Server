exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cart_products').del()
    .then(() => knex('products').del())
    .then(() => knex('carts').del())
    .then(() => knex('users').del())
}
