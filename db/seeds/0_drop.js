exports.seed = function(knex, Promise) {
  return knex('cart_products').del()
    .then(() => knex('products').del())
    .then(() => knex('carts').del())
    .then(() => knex('users').del())
}
