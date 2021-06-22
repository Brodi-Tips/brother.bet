exports.up = (knex) => {
  return knex.schema.createTable('sensor', (table) => {
    table.string('id').primary();
    table.bigInteger('timestamp').notNullable().primary();
    table.string('date').notNullable();
    table.string('name').notNullable();
    table.float('value').notNullable();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('sensor');
};
