exports.up = function(knex, Promise) {
  return knex.schema.createTable('items', (table) => {
    table.increments()
    table.string('name').notNullable().defaultTo('')
    table.string('image').notNullable().defaultTo('')
    table.string('upc').notNullable().defaultTo('')
    table.timestamps(true, true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('items')
}
