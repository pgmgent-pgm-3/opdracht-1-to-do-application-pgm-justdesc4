const tableName = "categories";

export function up(knex) {
  return knex.schema.createTable(tableName, function (table) {
    table.increments("id").primary();
    table.string("link").notNullable();
    table.string("category").notNullable();
  });
}

export function down(knex) {
  return knex.schema.dropTable(tableName);
}
