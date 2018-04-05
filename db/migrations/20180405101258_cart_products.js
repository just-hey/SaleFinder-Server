exports.up = function(knex, Promise) {
  return knex.schema.createTable('cart_products', (table) => {
    table.increments()
    table.integer('cart_id').notNullable()
    table.foreign('cart_id').references('carts.id').onDelete('CASCADE')
    table.integer('product_id').notNullable()
    table.foreign('product_id').references('products.id').onDelete('CASCADE')
    table.timestamps(true, true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('cart_products')
}
