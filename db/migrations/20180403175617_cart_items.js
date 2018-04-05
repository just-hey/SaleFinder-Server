exports.up = function(knex, Promise) {
  return knex.schema.createTable('cart_items', (table) => {
    table.increments()
    table.integer('cart_id').notNullable()
    table.foreign('cart_id').references('carts.id').onDelete('CASCADE')
    table.integer('item_id').notNullable()
    table.foreign('item_id').references('items.id').onDelete('CASCADE')
    table.timestamps(true, true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('cart_items')
}
