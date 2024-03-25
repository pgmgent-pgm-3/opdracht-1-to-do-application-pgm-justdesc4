const tableName = "categories";

export function up(knex) {
  return knex.schema.createTable(tableName, function (table) {
    table.increments("id").primary();
    table.string("link").notNullable();
    table.string("category").notNullable();
    table.integer("user_id").unsigned().notNullable();
    table.foreign("user_id").references("users.id");
  });
}

export function down(knex) {
  return knex.schema.dropTable(tableName);
}
