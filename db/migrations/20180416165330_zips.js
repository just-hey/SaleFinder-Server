exports.up = function(knex, Promise) {
  return knex.schema.createTable('zips', (table) => {
    table.increments()
    table.string('zip').notNullable().unique().defaultTo('')
    table.timestamps(true, true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('zips')
}
