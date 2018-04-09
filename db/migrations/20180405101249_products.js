exports.up = function(knex, Promise) {
  return knex.schema.createTable('products', (table) => {
    table.increments()
    table.string('name').notNullable().defaultTo('')
    table.string('image').notNullable().defaultTo('http://www.moxmultisport.com/wp-content/uploads/no-image.jpg')
    table.string('upc').notNullable().defaultTo('000000000000')
    table.string('price').notNullable().defaultTo('')
    table.string('store').notNullable().defaultTo('')
    table.string('zip').notNullable().defaultTo('local')
    table.integer('week').notNullable().defaultTo(0)
    table.timestamps(true, true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('products')
}
